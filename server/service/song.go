package service

import (
    //"database/sql"
    //"errors"
    "github.com/jmoiron/sqlx"
    "github.com/op/go-logging"
    "github.com/mnezerka/bluechords/server/model"
    //"github.com/mnezerka/bluechords/server/configuration"
)

type SongService struct {
    db          *sqlx.DB
    log         *logging.Logger
}

func NewSongService(db *sqlx.DB, log *logging.Logger) *SongService {
    return &SongService{db: db, log: log}
}

func (u *SongService) CreateSong(song *model.Song) (*model.Song, error) {

    userSQL := `INSERT INTO songs (name, content, artist, created, updated) VALUES (:name, :content, :artist, UNIX_TIMESTAMP(NOW()), UNIX_TIMESTAMP(NOW())`
    u.log.Infof("SQL: %s", userSQL)
    res, err := u.db.NamedExec(userSQL, song)
    if err != nil {
        return nil, err
    }

    id, err := res.LastInsertId()
    if err != nil {
        return nil, err
    }

    song.ID = id

    return song, nil
}
