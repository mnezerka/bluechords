package model

import (
    jwt "github.com/dgrijalva/jwt-go"
)

// Create a struct that will be encoded to a JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time
type Claims struct {
    Id int64            `json:"id"`
    jwt.StandardClaims
}

// Struct used to read the username and password from the request body
type UserCredentials struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    *Response
    AccessToken string `json:"access_token,omitempty"`
}

type Response struct {
    Code  int    `json:"code"`
    Error string `json:"error,omitempty"`
}
