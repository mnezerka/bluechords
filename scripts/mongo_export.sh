#!/bin/bash -e

mkdir -p dump

docker-compose exec mongo mongoexport --quiet -d default_default -c User -u prisma -p prisma --authenticationDatabase admin > dump/User.json 2>&1
docker-compose exec mongo mongoexport --quiet -d default_default -c Song -u prisma -p prisma --authenticationDatabase admin > dump/Song.json 2>&1
