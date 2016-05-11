#!/bin/bash 

# colors for nice shell output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ "$#" -lt 2 ]; then
        echo "Illegal number of parameters"
        exit 1
fi

DOCKER_NAME=$1
CMD=$2

shift 2

case $CMD in
    build)
        if [ "$#" -ne 1 ]; then
                echo "Illegal number of parameters, build requires directory"
                exit 1
        fi

        echo "$(YELLOW)Building docker ${DOCKER_NAME} from directory ${1}$(NC)"
        docker build -t ${DOCKER_NAME} ${1}
        ;;

    start)
        echo "Starting docker ${DOCKER_NAME}"
        docker run -d --name ${DOCKER_NAME} ${1} ${DOCKER_NAME}
        ;;

    stop)
        echo "Stopping docker ${DOCKER_NAME}"
        if docker ps | grep -q ${DOCKER_NAME}; then
            docker stop ${DOCKER_NAME}
        fi
        ;; 

    rm)
        echo "Removing docker ${DOCKER_NAME}"
        if docker ps -a | grep -q ${DOCKER_NAME}; then
 		    docker -l=fatal rm ${DOCKER_NAME}
        fi
        ;;
    *)
        echo "unknown action $CMD"
        
esac

