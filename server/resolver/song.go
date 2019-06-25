package resolver

import (
    graphql "github.com/graph-gophers/graphql-go"
    "strconv"
    "github.com/mnezerka/bluechords/server/model"
)

type songResolver struct {
    s *model.Song
}

func (r *songResolver) ID() graphql.ID {
    return graphql.ID(strconv.FormatInt(r.s.ID, 10))
}

func (r *songResolver) Name() *string {
    return &r.s.Name
}

func (r *songResolver) Artist() *string {
    return &r.s.Artist
}

func (r *songResolver) Content() *string {
    return &r.s.Content
}

func (r *songResolver) Private() *bool {
    return &r.s.Private
}

/*
func (r *songResolver) Owner() *userResource {
    return &r.u.Private
}
*/

func (r *songResolver) Created() *int32 {
    return &r.s.Created
}

func (r *songResolver) Updated() *int32 {
    return &r.s.Updated
}
