package main

import (
    "log"
    "net/http"
    graphql "github.com/graph-gophers/graphql-go"
    "golang.org/x/net/context"
)

func main() {
    config := makeConfigFromFile(".")

    db, err := openDb(config)
    if err != nil {
        log.Fatalf("Unable to connect to db: %s \n", err)
    }

    ctx := context.Background()
    log := NewLogger(config)

    userService := NewUserService(db, log)
    authService := NewAuthService(config, log)

    ctx = context.WithValue(ctx, "config", config)
    ctx = context.WithValue(ctx, "log", log)
    ctx = context.WithValue(ctx, "userService", userService)
    ctx = context.WithValue(ctx, "authService", authService)

    graphqlSchema := graphql.MustParseSchema(GetRootSchema(), &Resolver{})

    http.Handle("/login", AddContext(ctx, Login()))

    loggerHandler := &LoggerHandler{config.DebugMode}
    http.Handle(
        "/query",
        AddContext(ctx, loggerHandler.Logging(Authenticate(&GraphQL{Schema: graphqlSchema}))))

    http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "graphiql.html")
    }))

    log.Fatal(http.ListenAndServe(":3000", nil))
}
