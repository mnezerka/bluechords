package resolver

import (
    graphql "github.com/graph-gophers/graphql-go"
    "strconv"
    "github.com/mnezerka/bluechords/server/model"
    "github.com/mnezerka/bluechords/server/service"
    "golang.org/x/net/context"
    "github.com/op/go-logging"
)

type SongResolver struct {
    s *model.Song
}

func (r *SongResolver) ID() graphql.ID {
    return graphql.ID(strconv.FormatInt(r.s.ID, 10))
}

func (r *SongResolver) Name() string {
    return r.s.Name
}

func (r *SongResolver) Artist() string {
    return r.s.Artist
}

func (r *SongResolver) Content() string {
    return r.s.Content
}

func (r *SongResolver) Private() bool {
    return r.s.Private
}

func (r *SongResolver) Owner() *UserResolver {
    return &UserResolver{r.s.Owner}
}

func (r *SongResolver) Created() int32 {
    return r.s.Created
}

func (r *SongResolver) Updated() int32 {
    return r.s.Updated
}

// create new song
func (r *Resolver) CreateSong(ctx context.Context, args *struct {Name string}) (*SongResolver, error) {

    song := model.NewSong(args.Name)

    ctx.Value("log").(*logging.Logger).Infof("Create song %v", song)

    song, err := ctx.Value("songService").(*service.SongService).CreateSong(song)
    if err != nil {
        ctx.Value("log").(*logging.Logger).Errorf("Graphql error : %v", err)
        return nil, err
    }

    ctx.Value("log").(*logging.Logger).Debugf("Created song: %v", *song)

    return &SongResolver{song}, nil
}

