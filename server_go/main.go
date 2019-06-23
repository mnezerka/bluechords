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
    //"github.com/graphql-go/graphql"
    "github.com/graphql-go/handler"
    )

type User struct {
    Id          int     `json:"id"`
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
        err = results.Scan(&user.Id, &user.Email)

        users = append(users, user)

        if err != nil {
            panic(err.Error()) // proper error handling instead of panic in your app
        }
    }

    return users
}

func getHandler() (*handler.Handler) {

    schema := getSchema()

    h := handler.New(&handler.Config{
        Schema: schema,
        Pretty: true,
        GraphiQL: true,
    })

    return h
}

func main() {
    handler := getHandler()

    http.Handle("/graphql", handler)

    fmt.Println("Bluechords server is running on port 8080")

    log.Fatal(http.ListenAndServe(":8080", nil))
}
