FROM ubuntu

# Update the repository and install necessary tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    monit

COPY ./docker/monitrc /etc/monit/monitrc
RUN chmod 0700 /etc/monit/monitrc

EXPOSE 8081

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

RUN npm update -g npm

RUN npm install -g gulp

RUN npm update -g npm
RUN npm install -g gulp

ENTRYPOINT exec monit -I
