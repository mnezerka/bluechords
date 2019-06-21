#!/bin/bash -e

REMOTE=$1

echo $REMOTE

echo "Check connection"
ssh $REMOTE 'id'

echo "Building and deploying web application"
cd app
npm install
npm run build
docker build -t bluechords_web .
docker save bluechords_web | bzip2 | pv | ssh $REMOTE 'bunzip2 | docker load'
