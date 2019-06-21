#!/bin/bash -e

REMOTE=$1

echo $REMOTE

echo "Check connection"
ssh $REMOTE 'id'

echo "Building and deploying graphql server"
cd server
docker build -t bluechords_server .
docker save bluechords_server | bzip2 | pv | ssh $REMOTE 'bunzip2 | docker load'
