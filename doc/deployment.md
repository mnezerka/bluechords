# BlueChords Deployment


## Manual deployment

### Install prerequisities on your production host

Install Docker for your distribution as well as docker-compose

Your user should have enough permissions (sudo). To add him/her to sudoers:
```
usermod -aG sudo username
```

### Build web app docker image

Build web application (production build):

```sh
cd app
npm install
npm run build
```
Production ready artifacts (static content to be served by any http server) are
stored in `build` sub-directory.

Build docker image in your local docker daemon:
```sh
cd app
docker build -t bluechords_web .
```

Transfer image to your production host:
```sh
docker save bluechords_web | bzip2 | pv | ssh songchords 'bunzip2 | docker load'
```
where `songchords` is ssh id of your production server


### Build GraphQL server and docker image:

```sh
cd server
docker build -t bluechords_server .
```

Transfer image to your production host:
```sh
docker save bluechords_server | bzip2 | pv | ssh songchords 'bunzip2 | docker load'
```
where `songchords` is ssh id of your production server


### Backup data

Following command will dump important collection from mongo container into `dump` directory:

```sh
./scripts/mongo_export.sh
```

### Start containers

```sh
docker-compose -f docker-compose-prod.yml up -d
```

### Deploy database schema

```sh
docker-compose run server sh -c 'cd prisma && prisma deploy'
```

### Verify

Check that all containers are running:
```sh
dc -f docker-compose-production.yml ps
```
