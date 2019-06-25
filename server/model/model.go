package model

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
