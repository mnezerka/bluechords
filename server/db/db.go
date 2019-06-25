package db

import (
    "fmt"
    "github.com/jmoiron/sqlx"
    "github.com/op/go-logging"
    _ "github.com/go-sql-driver/mysql"
    "time"
    "github.com/mnezerka/bluechords/server/configuration"
)

func OpenDb(log *logging.Logger, config *configuration.Config) (*sqlx.DB, error) {
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
        return OpenDb(log, config)
    }
    log.Info("Database is connected ")
    return db, nil
}
