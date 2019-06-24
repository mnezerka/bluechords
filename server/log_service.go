package main

import (
    "github.com/op/go-logging"
    "os"
)

func NewLogger(config *Config) *logging.Logger {
    backend := logging.NewLogBackend(os.Stderr, "", 0)
    format := logging.MustStringFormatter(config.LogFormat)
    backendFormatter := logging.NewBackendFormatter(backend, format)

    backendLeveled := logging.AddModuleLevel(backendFormatter)
    backendLeveled.SetLevel(logging.INFO, "")
    if config.DebugMode {
        backendLeveled.SetLevel(logging.DEBUG, "")
    }

    logging.SetBackend(backendLeveled)
    logger := logging.MustGetLogger("server")
    return logger
}
