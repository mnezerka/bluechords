package handler

import (
    "encoding/json"
    "github.com/op/go-logging"
    "net/http"
    "github.com/mnezerka/bluechords/server/model"
    "github.com/mnezerka/bluechords/server/configuration"
    "github.com/mnezerka/bluechords/server/service"
)

func writeResponse(w http.ResponseWriter, response interface{}, code int) {
    jsonResponse, _ := json.Marshal(response)
    w.WriteHeader(code)
    w.Write(jsonResponse)
}

// Create the Signin handler
func Login() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        // we always return json (both for ok and error)
        w.Header().Set("Content-Type", "application/json")

        // get request context
        ctx := r.Context()

        loginResponse := &model.LoginResponse{}

        var creds model.UserCredentials

        // check http method, POST is required
        if r.Method != http.MethodPost {
            response := &model.Response{
                Code:  http.StatusMethodNotAllowed,
                Error: configuration.PostMethodSupported,
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

            response := &model.Response{
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
        user, err := ctx.Value("userService").(*service.UserService).ComparePassword(&creds)
        if err != nil {
            response := &model.Response{
                Code:  http.StatusUnauthorized,
                Error: err.Error(),
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        ctx.Value("log").(*logging.Logger).Debug("User found, generating and signing JWT token")

        tokenString, err := ctx.Value("authService").(*service.AuthService).SignJWT(user)
        if err != nil {
            response := &model.Response{
                Code:  http.StatusBadRequest,
                Error: configuration.TokenError,
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        ctx.Value("log").(*logging.Logger).Debugf("Token string: %s", *tokenString)

        response := &model.Response{
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
