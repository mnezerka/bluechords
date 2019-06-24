package main

import (
    "fmt"
    "github.com/jmoiron/sqlx"
    "github.com/op/go-logging"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

func openDb(log *logging.Logger, config *Config) (*sqlx.DB, error) {
    log.Info("Database is connecting... ")

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
        log.Info("Retry database connection in 5 seconds... ")
        time.Sleep(time.Duration(5) * time.Second)
        return openDb(log, config)
    }
    log.Info("Database is connected ")
    return db, nil
}
