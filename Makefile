
dockerBuild= \
	echo "Building docker ${1} from directory ${2}"; \
	docker build -t ${1} ${2}

dockerStop= \
	echo "Stopping docker ${1}"; \
	if docker ps | grep -q ${1}; then \
		docker stop ${1}; fi

dockerStart= \
	echo "Starting docker ${1}"; \
	docker run -d --name ${1} ${2} ${1}

dockerRemove= \
	echo "Removing docker ${1}"; \
	if docker ps -a | grep -q ${1}; then \
		docker -l=fatal rm ${1}; fi

all: build run
	@echo "No default action"

status:
	@docker ps

app-build:
	@$(call dockerBuild,bluechords-app,app)

app-run:
	@$(call dockerStart,bluechords-app,-p 9161:8081 -v "`pwd`/app":/app)

app-stop:
	@$(call dockerStop,bluechords-app)

app-rm: app-stop
	@$(call dockerRemove,bluechords-app)

app-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluechords-app

app: app-build app-run

app-install:
	docker exec bluechords-app bash -c "cd /app && npm install"

app-watch:
	docker exec bluechords-app bash -c "cd /app && gulp watch"

