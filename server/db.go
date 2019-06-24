package main

import (
    "fmt"
    "github.com/jmoiron/sqlx"
    _ "github.com/go-sql-driver/mysql"
    "log"
    "time"
)

func openDb(config *Config) (*sqlx.DB, error) {
    log.Println("Database is connecting... ")

    db, err := sqlx.Open("mysql", fmt.Sprintf("%s:%s@(%s:%s)/%s",
        config.DBUser,
        config.DBPassword,
        config.DBHost,
        config.DBPort,
        config.DBName,
    ))

    if err != nil {
        panic(err.Error())
    }

    if err = db.Ping(); err != nil {
        log.Println("Retry database connection in 5 seconds... ")
        time.Sleep(time.Duration(5) * time.Second)
        return openDb(config)
    }
    log.Println("Database is connected ")
    return db, nil
}
