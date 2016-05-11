all: build run
	@echo "No default action"

status:
	@docker ps

###################################################
# DB
db-build:
	./scripts/dockerctl.sh bluechords-db build db

db-run:
	./scripts/dockerctl.sh bluechords-db start '-e MYSQL_ROOT_PASSWORD=root'

db-stop:
	./scripts/dockerctl.sh bluechords-db stop

db-rm: db-stop
	./scripts/dockerctl.sh bluechords-db rm 

db-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluechords-app

db: db-build db-run

###################################################
# API

api-build:
	./scripts/dockerctl.sh bluechords-api build api

api-run:
	./scripts/dockerctl.sh bluechords-api start '-v $(shell pwd)/api/src:/var/www/html/api'

api-stop:
	./scripts/dockerctl.sh bluechords-api stop

api-rm: api-stop
	./scripts/dockerctl.sh bluechords-api rm 

api-ip:
	docker inspect --format '{{ .NetworkSettings.IPAddress}}' bluechords-api

api: api-build api-run



###################################################
# Application

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

