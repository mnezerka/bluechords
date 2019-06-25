package model

type Song struct {
    ID        int64     `db:"id"`
    Name      string    `db:"name"`
    Artist    string    `db:"artist"`
    Content   string    `db:"content"`
    Private   bool      `db:"private"`
    Owner     User
    Created   int32     `db:"created"`
    Updated   int32     `db:"updated"`
}

