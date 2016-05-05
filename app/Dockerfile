FROM ubuntu:14.04


# Update the repository and install necessary tools
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    monit

COPY ./docker/monitrc /etc/monit/monitrc
RUN chmod 0700 /etc/monit/monitrc

EXPOSE 8081 

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

RUN apt-get install -y nodejs

RUN sudo npm update -g npm

RUN sudo npm install -g gulp


ENTRYPOINT exec monit -I
