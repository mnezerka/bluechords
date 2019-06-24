package main

import (
    "bytes"
    "encoding/base64"
    "encoding/json"
    "errors"
    "github.com/graph-gophers/graphql-go"
    "github.com/op/go-logging"
    "golang.org/x/net/context"
    "io/ioutil"
    "log"
    "net"
    "net/http"
    "strings"
    jwt "github.com/dgrijalva/jwt-go"
)

type GraphQL struct {
    Schema  *graphql.Schema
}

func (h *GraphQL) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    var params struct {
        Query         string                 `json:"query"`
        OperationName string                 `json:"operationName"`
        Variables     map[string]interface{} `json:"variables"`
    }

    if err := json.NewDecoder(r.Body).Decode(&params); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    // by mn ctx := h.Loaders.Attach(r.Context())
    ctx := r.Context()

    response := h.Schema.Exec(ctx, params.Query, params.OperationName, params.Variables)
    responseJSON, err := json.Marshal(response)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(responseJSON)
}

func Authenticate(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var (
            isAuthorized = false
            userId       string
        )

        ctx := r.Context()

        ctx.Value("log").(*logging.Logger).Debugf("Inside Authenticate")

        // check if user is authorized
        token, err := validateBearerAuthHeader(ctx, r)
        if err == nil {
            isAuthorized = true
            ctx.Value("log").(*logging.Logger).Debugf("User is authorized")

            if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
                ctx.Value("log").(*logging.Logger).Debugf("Inside claim %s", claims)
                userIdByte, _ := base64.StdEncoding.DecodeString(claims["id"].(string))
                ctx.Value("log").(*logging.Logger).Debugf("Inside claim - have user id byte")
                userId = string(userIdByte[:])
                ctx.Value("log").(*logging.Logger).Debugf("Inside claim - have user id")
            } else {
                log.Println(err)
            }
        }

        //ctx.Value("log").(*logging.Logger).Debugf("User is authorized")

        ip, _, err := net.SplitHostPort(r.RemoteAddr)
        if err != nil {
            log.Println(w, "Requester ip: %q is not IP:port", r.RemoteAddr)
        }

        ctx = context.WithValue(ctx, "user_id", &userId)
        ctx = context.WithValue(ctx, "requester_ip", &ip)
        ctx = context.WithValue(ctx, "is_authorized", isAuthorized)
        h.ServeHTTP(w, r.WithContext(ctx))
    })
}

func Login() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        ctx := r.Context()
        loginResponse := &LoginResponse{}

        if r.Method != http.MethodPost {
            response := &Response{
                Code:  http.StatusMethodNotAllowed,
                Error: PostMethodSupported,
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        // get user credentials from authorization header (basic auth scheme)
        userCredentials, err := validateBasicAuthHeader(r)
        if err != nil {
            response := &Response{
                Code:  http.StatusBadRequest,
                Error: err.Error(),
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

        // try to get user
        user, err := ctx.Value("userService").(*UserService).ComparePassword(userCredentials)
        if err != nil {
            response := &Response{
                Code:  http.StatusUnauthorized,
                Error: err.Error(),
            }
            loginResponse.Response = response
            writeResponse(w, loginResponse, loginResponse.Code)
            return
        }

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
    })
}

func writeResponse(w http.ResponseWriter, response interface{}, code int) {
    jsonResponse, _ := json.Marshal(response)
    w.WriteHeader(code)
    w.Write(jsonResponse)
}

func validateBasicAuthHeader(r *http.Request) (*UserCredentials, error) {
    auth := strings.SplitN(r.Header.Get("Authorization"), " ", 2)
    if len(auth) != 2 || auth[0] != "Basic" {
        return nil, errors.New(CredentialsError)
    }

    payload, _ := base64.StdEncoding.DecodeString(auth[1])
    pair := strings.SplitN(string(payload), ":", 2)
    if len(pair) != 2 {
        return nil, errors.New(CredentialsError)
    }

    userCredentials := UserCredentials{
        Email:    pair[0],
        Password: pair[1],
    }

    return &userCredentials, nil
}

func validateBearerAuthHeader(ctx context.Context, r *http.Request) (*jwt.Token, error) {
    var tokenString string
    keys, ok := r.URL.Query()["at"]
    if !ok || len(keys) < 1 {
        auth := strings.SplitN(r.Header.Get("Authorization"), " ", 2)
        if len(auth) != 2 || auth[0] != "Bearer" {
            return nil, errors.New(CredentialsError)
        }
        tokenString = auth[1]
    } else {
        tokenString = keys[0]
    }
    token, err := ctx.Value("authService").(*AuthService).ValidateJWT(&tokenString)
    return token, err
}


func AddContext(ctx context.Context, h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx.Value("log").(*logging.Logger).Debugf("Inside add context")
        h.ServeHTTP(w, r.WithContext(ctx))
    })
}

type LoggerHandler struct {
    DebugMode bool
}

func (l *LoggerHandler) Logging(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := r.Context()
        log := ctx.Value("log").(*logging.Logger)
        log.Infof("%s %s %s %s", r.RemoteAddr, r.Method, r.URL, r.Proto)
        log.Infof("User agent : %s", r.UserAgent())
        if l.DebugMode {
            body, err := ioutil.ReadAll(r.Body)
            if err != nil {
                log.Errorf("Reading request body error: %s", err)
            }
            reqStr := ioutil.NopCloser(bytes.NewBuffer(body))
            log.Debugf("Request body : %v", reqStr)
            r.Body = reqStr
        }
        h.ServeHTTP(w, r)
    })
}
