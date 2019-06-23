package main

import (
    "fmt"
    "errors"
    jwt "github.com/dgrijalva/jwt-go"
    "github.com/mitchellh/mapstructure"
)

var jwtSecret []byte = []byte("thepolyglotdeveloper")

func ValidateJWT(t string) (interface{}, error) {
    if t == "" {
        return nil, errors.New("Authorization token must be present")
    }

    token, _ := jwt.Parse(t, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("There was an error")
        }
        return jwtSecret, nil
    })

    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        var decodedToken interface{}
        mapstructure.Decode(claims, &decodedToken)
        return decodedToken, nil
    } else {
        return nil, errors.New("Invalid authorization token")
    }
}
