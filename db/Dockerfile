############################################################
# Dockerfile to build Nginx Installed Containers
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM mysql:5.5

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

