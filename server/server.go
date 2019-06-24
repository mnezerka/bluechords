package main

import (
    "net/http"
    graphql "github.com/graph-gophers/graphql-go"
    "golang.org/x/net/context"
)

func main() {
    config := makeConfigFromFile(".")

    ctx := context.Background()
    log := NewLogger(config)

    db, err := openDb(log, config)
    if err != nil {
        log.Fatalf("Unable to connect to db: %s \n", err)
    }

    userService := NewUserService(db, log)
    authService := NewAuthService(config, log)

    ctx = context.WithValue(ctx, "config", config)
    ctx = context.WithValue(ctx, "log", log)
    ctx = context.WithValue(ctx, "userService", userService)
    ctx = context.WithValue(ctx, "authService", authService)

    graphqlSchema := graphql.MustParseSchema(GetRootSchema(), &Resolver{})

    // endpoint for authentication - generating token
    http.Handle("/login", AddContext(ctx, Login()))

    // endpoint for querying
    loggerHandler := &LoggerHandler{config.DebugMode}
    http.Handle(
        "/query",
        AddContext(ctx, loggerHandler.Logging(Authenticate(&GraphQL{Schema: graphqlSchema}))))

    // enpoint for interactive graphql web IDE
    http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "graphiql.html")
    }))

    log.Info("Listening...")
    log.Fatal(http.ListenAndServe(":3000", nil))
}
