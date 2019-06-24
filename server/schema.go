package main

func GetRootSchema() string {

    return `
        schema {
            query: Query
            mutation: Mutation
        }

        type Query {
            user(email: String!): User
            users(): [User]!
        }

        type Mutation {
            createUser(email: String!, password: String!): User
        }

        type User {
            id: ID!
            email: String
            password: String
            created: Int
        }
    `
}
