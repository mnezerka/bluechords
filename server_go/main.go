package main

/*
https://zupzup.org/go-example-graphql/
https://www.thepolyglotdeveloper.com/2018/05/getting-started-graphql-golang/
*/

import (
    "fmt"
    "log"
    "net/http"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
    //https://github.com/jmoiron/sqlx
    "github.com/graphql-go/graphql"
    "github.com/graphql-go/handler"
    )

type User struct {
    ID          int     `json:"id"`
    Email       string  `json:"email"`
    Password    string  `json:"password"`
    Created     int     `json:"created"`
}

// fetch users from database
func resolveUsers() []User {

    //db, err := sql.Open("mysql", "root:prisma@/testdb")
    db, err := sql.Open("mysql", "bc:bc@/bc")
    if err != nil {
        panic(err)
    }

    defer db.Close()

    results, err := db.Query("SELECT id, email FROM users")
    if err != nil {
        panic(err.Error()) // proper error handling instead of panic in your app
    }

    users := make([]User, 0, 2)

    for results.Next() {

        var user User

        // for each row, scan the result into our tag composite object
        err = results.Scan(&user.ID, &user.Email)

        users = append(users, user)

        if err != nil {
            panic(err.Error()) // proper error handling instead of panic in your app
        }
    }

    return users
}

func main() {
    fmt.Println("Bluechords server")

    userType := graphql.NewObject(graphql.ObjectConfig{
        Name: "User",
        Fields: graphql.Fields{
        "id": &graphql.Field{
            Type: graphql.Int,
        },
        "email": &graphql.Field{
            Type: graphql.String,
        },
        "password": &graphql.Field{
            Type: graphql.String,
        },
        "created": &graphql.Field{
            Type: graphql.Int,
        },
    }})

    rootQuery := graphql.NewObject(graphql.ObjectConfig{
        Name: "Query",
        Fields: graphql.Fields{
            "users": &graphql.Field{
                Type: graphql.NewList(userType),
                Resolve: func(params graphql.ResolveParams) (interface{}, error) {
                    return resolveUsers(), nil
                },
            },
        },
    })

    schema, _ := graphql.NewSchema(graphql.SchemaConfig{
        Query:    rootQuery,
        //Mutation: rootMutation,
    })

    h := handler.New(&handler.Config{
        Schema: &schema,
        Pretty: true,
        GraphiQL: true,
    })

    http.Handle("/graphql", h)

    fmt.Println("Now server is running on port 8080")

    log.Fatal(http.ListenAndServe(":8080", nil))
}
