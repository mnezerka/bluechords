package main

import (
    "golang.org/x/crypto/bcrypt"
    "log"
)

type UserCredentials struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginResponse struct {
    *Response
    AccessToken string `json:"access_token,omitempty"`
}

type Permission struct {
    ID   int64
    Name string
}

type Response struct {
    Code  int    `json:"code"`
    Error string `json:"error,omitempty"`
}

type User struct {
    ID        int64     `db:"id"`
    Email     string    `db:"email"`
    Password  string    `db:"password"`
    Created   int32     `db:"created"`
}

// modify user password to hash instead of "real" value
func (user *User) HashedPassword() error {
    hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        log.Println(err)
        return err
    }
    user.Password = string(hash)
    return nil
}

func (user *User) ComparePassword(password string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
    if err != nil {
        log.Println(err)
        return false
    }
    return true
}
