package handler

import (
    "encoding/base64"
    "errors"
    "github.com/op/go-logging"
    "golang.org/x/net/context"
    "net/http"
    "strings"
    jwt "github.com/dgrijalva/jwt-go"
    "github.com/mnezerka/bluechords/server/model"
    "github.com/mnezerka/bluechords/server/configuration"
    "github.com/mnezerka/bluechords/server/service"
)

func Authenticate(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var (
            isAuthorized = false
        )

        ctx := r.Context()

        // check if user is authorized
        token, claims, err := validateBearerAuthHeader(ctx, r)
        if err == nil {
            isAuthorized = true
            ctx.Value("log").(*logging.Logger).Debugf("User is authorized")

            if token.Valid {
                ctx.Value("log").(*logging.Logger).Debugf("Token is valid, userid: %d", claims.Id)
            }
        }

        ctx = context.WithValue(ctx, "user_id", &claims.Id)
        ctx = context.WithValue(ctx, "is_authorized", isAuthorized)
        h.ServeHTTP(w, r.WithContext(ctx))
    })
}

func validateBasicAuthHeader(r *http.Request) (*model.UserCredentials, error) {
    auth := strings.SplitN(r.Header.Get("Authorization"), " ", 2)
    if len(auth) != 2 || auth[0] != "Basic" {
        return nil, errors.New(configuration.CredentialsError)
    }

    payload, _ := base64.StdEncoding.DecodeString(auth[1])
    pair := strings.SplitN(string(payload), ":", 2)
    if len(pair) != 2 {
        return nil, errors.New(configuration.CredentialsError)
    }

    userCredentials := model.UserCredentials{
        Email:    pair[0],
        Password: pair[1],
    }

    return &userCredentials, nil
}

func validateBearerAuthHeader(ctx context.Context, r *http.Request) (*jwt.Token, *model.Claims, error) {
    var tokenString string

    // first, try to get auth token from query parameter "at"
    keys, ok := r.URL.Query()["at"]
    if !ok || len(keys) < 1 {

        // second, try to get auth token from authorization header
        auth := strings.SplitN(r.Header.Get("Authorization"), " ", 2)
        if len(auth) != 2 || auth[0] != "Bearer" {
            return nil, nil, errors.New(configuration.CredentialsError)
        }
        tokenString = auth[1]
    } else {
        tokenString = keys[0]
    }

    // we have token, let's validate it
    token, claims, err := ctx.Value("authService").(*service.AuthService).ValidateJWT(&tokenString)

    return token, claims, err
}
