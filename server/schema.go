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
            createSong(name: String!): Song
        }

        type User {
            id: ID!
            email: String!
            password: String
            created: Int
        }

        type Song {
            id: ID!
            name: String!
            artist: String!
            content: String!
            private: Boolean!
            owner: User
            created: Int!
            updated: Int!
        }
    `
}
