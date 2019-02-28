#!/bin/bash -e

REMOTE=$1

echo $REMOTE

echo "Building and deploying web application"
cd app
npm install
npm run build
docker build -t bluechords_web .
docker save bluechords_web | bzip2 | pv | ssh $REMOTE 'bunzip2 | docker load'

echo "Building and deploying graphql server"
cd ../server
docker build -t bluechords_server .
docker save bluechords_server | bzip2 | pv | ssh $REMOTE 'bunzip2 | docker load'
