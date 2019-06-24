package main

import (
    graphql "github.com/graph-gophers/graphql-go"
    "strconv"
)

type userResolver struct {
    u *User
}

func (r *userResolver) ID() graphql.ID {
    //return graphql.ID(strconv.Itoa(r.u.ID))
    return graphql.ID(strconv.FormatInt(r.u.ID, 10))
}

func (r *userResolver) Email() *string {
    return &r.u.Email
}

func (r *userResolver) Password() *string {
    maskedPassword := "********"
    return &maskedPassword
}

func (r *userResolver) Created() *int32 {
    return &r.u.Created
}
