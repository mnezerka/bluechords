package main

import (
    "errors"
    "github.com/op/go-logging"
    "golang.org/x/net/context"
)

func (r *Resolver) User(ctx context.Context, args struct {Email string}) (*userResolver, error) {

    userId := ctx.Value("user_id").(*int64)

    user, err := ctx.Value("userService").(*UserService).FindByEmail(args.Email)

    if err != nil {
        ctx.Value("log").(*logging.Logger).Errorf("Graphql error : %v", err)
        return nil, err
    }
    ctx.Value("log").(*logging.Logger).Debugf("Retrieved user by user_id[%d] : %v", *userId, *user)
    return &userResolver{user}, nil
}

func (r *Resolver) Users(ctx context.Context) ([]*userResolver, error) {

    ctx.Value("log").(*logging.Logger).Debugf("here")

    if isAuthorized := ctx.Value("is_authorized").(bool); !isAuthorized {
        return nil, errors.New(CredentialsError)
    }

    ctx.Value("log").(*logging.Logger).Debugf("here2")

    userId := ctx.Value("user_id").(*int64)

    ctx.Value("log").(*logging.Logger).Debugf("here3")

    users, err := ctx.Value("userService").(*UserService).List()
    //count, err := ctx.Value("userService").(*UserService).Count()

    ctx.Value("log").(*logging.Logger).Debugf("here4")


    ctx.Value("log").(*logging.Logger).Debugf("Retrieved users by user_id[%d] :", *userId)

    config := ctx.Value("config").(*Config)

    if config.DebugMode {
        for _, user := range users {
            ctx.Value("log").(*logging.Logger).Debugf("%v", *user)
        }
    }

    ctx.Value("log").(*logging.Logger).Debugf("Retrieved total users count by user_id[%d] : %v", *userId, len(users))

    if err != nil {
        ctx.Value("log").(*logging.Logger).Errorf("Graphql error : %v", err)
        return nil, err
    }

    var result []*userResolver
    for _, v := range users {
        result = append(result, &userResolver{v})
    }

    //return &userResolver{users: users, totalCount: count, from: &(users[0].ID), to: &(users[len(users)-1].ID)}, nil

    return result, nil
}
