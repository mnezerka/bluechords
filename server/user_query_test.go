package main

import (
    "github.com/graph-gophers/graphql-go"
    "github.com/graph-gophers/graphql-go/gqltesting"
    "golang.org/x/net/context"
    "testing"
    //"fmt"
)

var (
    rootSchema = graphql.MustParseSchema(GetRootSchema(), &Resolver{})
    ctx context.Context
    userId int64 = 999
)

func init() {
    config := makeConfigFromFile("../")

    log := NewLogger(config)

    db, err := openDb(log, config)
    if err != nil {
        log.Fatalf("Unable to connect to db: %s \n", err)
    }

    userService := NewUserService(db, log)
    authService := NewAuthService(config, log)


    ctx = context.Background()
    ctx = context.WithValue(ctx, "userService", userService)
    ctx = context.WithValue(ctx, "config", config)
    ctx = context.WithValue(ctx, "log", log)
    ctx = context.WithValue(ctx, "authService", authService)
    ctx = context.WithValue(ctx, "is_authorized", true)
    ctx = context.WithValue(ctx, "user_id", &userId)

    //ctx = context.WithValue(context.Background(), "userService", userService)
}

/*
func TestBasic(t *testing.T) {

    test := gqltesting.Test{
        Query: `
            {
                users {
                    id
                }
            }
        `,
        Schema: rootSchema,
        Context: ctx,
    }

    result := rootSchema.Exec(test.Context, test.Query, test.OperationName, test.Variables)

    fmt.Printf("result %v", result)

}
*/


func TestBasic(t *testing.T) {
    gqltesting.RunTests(t, []*gqltesting.Test{
        {
            Context: ctx,
            Schema:  rootSchema,
            Query: `
                {
                    user(email:"test@test.com") {
                        id
                        email
                        password
                    }
                }
            `,
            ExpectedResult: `
                {
                    "user": {
                      "id": "3",
                      "email": "test@test.com",
                      "password": "********"
                    }
                }
            `,
        },
        /*
        {
            Context: ctx,
            Schema:  rootSchema,
            Query: "{ users { id } }",
            ExpectedResult: `
                {
                    "user": {
                      "id": "3",
                      "email": "test@test.com",
                      "password": "********"
                    }
                }
            `,
        },
        */

    })
}
