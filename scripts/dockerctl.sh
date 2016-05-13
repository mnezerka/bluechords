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

        echo -e "${YELLOW}Building docker ${DOCKER_NAME} from directory ${1}${NC}"
        docker build -t ${DOCKER_NAME} ${1}
        ;;

    start)
        echo -e "${GREEN}Starting docker ${DOCKER_NAME}${NC}"
        docker run -d --name ${DOCKER_NAME} ${1} ${DOCKER_NAME}
        ;;

    stop)
        echo -e "${RED}Stopping docker ${DOCKER_NAME}${NC}"
        if docker ps | grep -q ${DOCKER_NAME}; then
            docker stop ${DOCKER_NAME}
        fi
        ;; 

    rm)
        echo -e "${RED}Removing docker ${DOCKER_NAME}${NC}"
        if docker ps -a | grep -q ${DOCKER_NAME}; then
 		    docker -l=fatal rm ${DOCKER_NAME}
        fi
        ;;
    *)
        echo "Unknown action $CMD"
        
esac

