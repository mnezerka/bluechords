package main

import (
    "github.com/op/go-logging"
    "golang.org/x/net/context"
)

func (r *Resolver) CreateUser(ctx context.Context, args *struct {Email string; Password string}) (*userResolver, error) {

    user := &User{
        Email:     args.Email,
        Password:  args.Password,
    }

    ctx.Value("log").(*logging.Logger).Infof("Create user %s %s", args.Email, args.Password)

    user, err := ctx.Value("userService").(*UserService).CreateUser(user)
    if err != nil {
        ctx.Value("log").(*logging.Logger).Errorf("Graphql error : %v", err)
        return nil, err
    }

    ctx.Value("log").(*logging.Logger).Debugf("Created user : %v", *user)

    return &userResolver{user}, nil
}
