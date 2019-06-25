package main

import (
    "net/http"
    graphql "github.com/graph-gophers/graphql-go"
    "golang.org/x/net/context"
    "github.com/mnezerka/bluechords/server/resolver"
    "github.com/mnezerka/bluechords/server/configuration"
    "github.com/mnezerka/bluechords/server/handler"
    "github.com/mnezerka/bluechords/server/db"
    "github.com/mnezerka/bluechords/server/service"
)

func main() {
    config := configuration.MakeConfigFromFile(".")

    ctx := context.Background()
    log := service.NewLogger(config)

    db, err := db.OpenDb(log, config)
    if err != nil {
        log.Fatalf("Unable to connect to db: %s \n", err)
    }

    userService := service.NewUserService(db, log)
    authService := service.NewAuthService(config, log)

    ctx = context.WithValue(ctx, "config", config)
    ctx = context.WithValue(ctx, "log", log)
    ctx = context.WithValue(ctx, "userService", userService)
    ctx = context.WithValue(ctx, "authService", authService)

    graphqlSchema := graphql.MustParseSchema(GetRootSchema(), &resolver.Resolver{})

    // endpoint for authentication - generating token
    http.Handle("/login", handler.AddContext(ctx, handler.Login()))

    // endpoint for querying
    loggerHandler := &handler.LoggerHandler{config.DebugMode}
    http.Handle(
        "/query",
        handler.AddContext(ctx, loggerHandler.Logging(handler.Authenticate(&handler.GraphQL{Schema: graphqlSchema}))))

    // enpoint for interactive graphql web IDE
    http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "graphiql.html")
    }))

    log.Info("Listening...")
    log.Fatal(http.ListenAndServe(":3000", nil))
}
