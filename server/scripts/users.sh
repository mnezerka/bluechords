#!/bin/bash -e

curl -X POST http://localhost:3000/query -d '{"query":"{users {id}}"}' -H "$(cat headers.curl)" -i
