#!/bin/bash

if [ "$1" == "-d" ]; then
    docker-compose -f docker-compose-dev.yml up
elif [ "$1" == "-p" ]; then
    (cd frontend && npm run build && cd -)
    docker-compose -f docker-compose-prod.yml up
elif [ "$1" == "-t" ]; then
    docker-compose -f docker-compose-test.yml up
else
    echo "Use -d to run in dev mode and -p for prod mode"
fi