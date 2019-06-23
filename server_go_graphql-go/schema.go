package main

import (
    "github.com/graphql-go/graphql"
    )

func getSchema() (*graphql.Schema) {
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

                    // authentication
                    _, err := ValidateJWT(params.Context.Value("token").(string))
                    if err != nil {
                        return nil, err
                    }

                    return resolveUsers(), nil
                },
            },
        },
    })

    schema, _ := graphql.NewSchema(graphql.SchemaConfig{
        Query:    rootQuery,
        //Mutation: rootMutation,
    })

    return &schema
}
