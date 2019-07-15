package service

import (
    "database/sql"
    "errors"
    "github.com/jmoiron/sqlx"
    "github.com/op/go-logging"
    "github.com/mnezerka/bluechords/server/model"
    "github.com/mnezerka/bluechords/server/configuration"
)

type UserService struct {
    db          *sqlx.DB
    log         *logging.Logger
}

func NewUserService(db *sqlx.DB, log *logging.Logger) *UserService {
    return &UserService{db: db, log: log}
}

func (u *UserService) FindByEmail(email string) (*model.User, error) {
    user := &model.User{}

    userSQL := `SELECT * FROM users WHERE email = ?`
    u.log.Debugf("query: %s, email: %s", userSQL, email)

    udb := u.db.Unsafe()
    row := udb.QueryRowx(userSQL, email)
    err := row.StructScan(user)
    if err == sql.ErrNoRows {
        return nil, errors.New("User not found")
    }
    if err != nil {
        u.log.Errorf("Error in retrieving user : %v", err)
        return nil, err
    }

    return user, nil
}

func (u *UserService) CreateUser(user *model.User) (*model.User, error) {
    userSQL := `INSERT INTO users (email, password, created) VALUES (:email, :password, UNIX_TIMESTAMP(NOW()))`

    u.log.Infof("SQL: %s", userSQL)

    user.HashedPassword()
    res, err := u.db.NamedExec(userSQL, user)

    if err != nil {
        return nil, err
    }

    id, err := res.LastInsertId()
    if err != nil {
        return nil, err
    }

    user.ID = id

    return user, nil
}

func (u *UserService) List() ([]*model.User, error) {
    users := make([]*model.User, 0)

    userSQL := `SELECT * FROM users ORDER BY created DESC;`
    err := u.db.Select(&users, userSQL)
    if err != nil {
        return nil, err
    }
    return users, nil
}

func (u *UserService) Count() (int, error) {
    var count int
    userSQL := `SELECT count(*) FROM users`
    err := u.db.Get(&count, userSQL)
    if err != nil {
        return 0, err
    }
    return count, nil
}

func (u *UserService) ComparePassword(userCredentials *model.UserCredentials) (*model.User, error) {
    user, err := u.FindByEmail(userCredentials.Email)
    if err != nil {
        return nil, errors.New(configuration.UnauthorizedAccess)
    }
    if result := user.ComparePassword(userCredentials.Password); !result {
        return nil, errors.New(configuration.UnauthorizedAccess)
    }
    return user, nil
}