#!/bin/bash -e

curl -X POST http://localhost:3000/login -s -d '{"email":"test@test.com", "password": "test"}' | jq -r ".access_token" > token

echo "Authorization: Bearer `cat token`" > headers.curl
