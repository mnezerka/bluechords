package main

import (
    "encoding/json"
    jwt "github.com/dgrijalva/jwt-go"
    "github.com/op/go-logging"
    "net/http"
)

// Create a struct that will be encoded to a JWT.
// We add jwt.StandardClaims as an embedded type, to provide fields like expiry time
type Claims struct {
    Id int64            `json:"id"`
    jwt.StandardClaims
}

// Create the Signin handler
func Login() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        // we always return json (both for ok and error)
        w.Header().Set("Content-Type", "application/json")

        // get request context
        ctx := r.Context()

        loginResponse := &LoginResponse{}

        var creds UserCredentials

        // check http method, POST is required
        if r.Method != http.MethodPost {
            response := &Response{
                Code:  http.StatusMethodNotAllowed,
                Error: PostMethodSupported,
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        // Get the JSON body and decode into credentials
        err := json.NewDecoder(r.Body).Decode(&creds)
        if err != nil {
            // If the structure of the body is wrong, return an HTTP error
            w.WriteHeader(http.StatusBadRequest)
            return

            response := &Response{
                Code:  http.StatusBadRequest,
                Error: err.Error(),
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return

        }

        // try to get user identified by email we received
        // If a password exists for the given user AND, if it is the same
        // as the password we received, the we can move ahead if NOT, then
        // we return an "Unauthorized" status
        ctx.Value("log").(*logging.Logger).Debugf("Identifying user %s in users database", creds.Email)
        user, err := ctx.Value("userService").(*UserService).ComparePassword(&creds)
        if err != nil {
            response := &Response{
                Code:  http.StatusUnauthorized,
                Error: err.Error(),
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        ctx.Value("log").(*logging.Logger).Debug("User found, generating and signing JWT token")

        tokenString, err := ctx.Value("authService").(*AuthService).SignJWT(user)
        if err != nil {
            response := &Response{
                Code:  http.StatusBadRequest,
                Error: TokenError,
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        ctx.Value("log").(*logging.Logger).Debugf("Token string: %s", *tokenString)

        response := &Response{
            Code: http.StatusOK,
        }
        loginResponse.Response = response
        loginResponse.AccessToken = *tokenString
        writeResponse(w, loginResponse, loginResponse.Code)

        // Finally, we set the client cookie for "token" as the JWT we just generated
        // we also set an expiry time which is the same as the token itself
        /*
        http.SetCookie(w, &http.Cookie{
            Name:    "token",
            Value:   tokenString,
            Expires: expirationTime,
        })
        */
    })
}
