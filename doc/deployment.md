# BlueChords Deployment


## Manual deployment

Clone git repository

### Backup data

```sh
./scripts/mongo_export.sh
```

### Build web application:

```sh
cd app
npm install
npm run build
```

Build artifacts (static content to be served by any http server) are stored
in `app/build` directory.


### Start DB (Mongo) and ORM (Prisma):

```sh
docker-compose up -d mongo prisma
```

### Deploy prisma and generate prisma javascript client:

```sh
docker-compose exec server sh -c 'cd prisma && prisma deploy'
```

### Build server and web app docker images

```
docker-compose build
```

### Start server and web app containers

Start containers (in daemon mode):
```sh
docker-compose up -d
```
