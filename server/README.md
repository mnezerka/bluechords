# Go Graphql Server

https://github.com/OscarYuen/go-graphql-starter

## Useful commands

Create new user:
```
curl -X POST http://localhost:3000/query -d '{"query":"mutation {createUser(email: \"test@test.com\", password: \"test\") {id}}"}'
```

Authentication - token is generated:
```
curl -X POST http://localhost:3000/login --user test@test.com:test:
curl -X POST http://localhost:3000/login -s --user "test@test.com:test" | jq -r ".access_token" > token
```

Prepare curl auth header file
```
echo "Authorization: Bearer `cat token`" > headers.curl
```

List users (authorized request)
```
curl -X POST http://localhost:3000/query -d '{"query":"{users {id}}"}' -H "$(cat headers.curl)" -i
```

Start mysql client:
```
docker-compose exec mysql mysql -ubc -pbc bc
```

## Usage

Basically there are two graphql queries and one mutation

### Query:

1. Get a user by email
2. Get user list

### Mutation:

To query a list of users, you need to be authenticated.
Authentication is not required for other operations.
In order to authenticate, here are the steps to follow:

1. Create a user

```graphql
mutation {
  createUser (email: "tester@tester.com", password: "123456") {
    id
  }
}
```

2. Log in by submitting your email and password through a Basic Authorization
   Header.

You can change the Authorization of request header in `graphiql.html` and
restart the server to see the effect of authentication using token

## Test:

- Run Unit Tests
    ```
    go test
    ```

## Reference

- [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go)
- [tonyghita/graphql-go-example](https://github.com/tonyghita/graphql-go-example)
- JWT Auth: https://www.sohamkamani.com/blog/golang/2019-01-01-jwt-authentication/

