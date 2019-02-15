# BlueChords Deployment


## Manual deployment

### Install prerequisities on on your host

Your user should have enough permissions (sudo). To add him/her to sudoers:
```
usermod -aG sudo username
```

Nodejs:
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
```

Clone git repository
```
https://github.com/bluechords/bluechords.git
cd bluechords
```

### Backup data

Following command will dump important collection from mongo container into `dump` directory:

```sh
./scripts/mongo_export.sh
```

### Start Mongo (DB), Prisma(GraphQL ORM):

```sh
docker-compose up -d mongo prisma server
```

### Deploy prisma and generate prisma javascript client:

```sh
docker-compose run server sh -c 'cd prisma && prisma deploy'
```

### Build web application:

```sh
cd app
npm install
npm run build
```

Build artifacts (static content to be served by any http server) are stored
in `app/build` directory.

### Build web app docker image

```
docker-compose build
```

### Start web app container

Start containers (in daemon mode):
```sh
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d
```

### Verify

Check that all containers are running:
```sh
dc -f docker-compose.yml -f docker-compose-prod.yml ps
```
