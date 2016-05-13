
 # unique docker ids
DB_ID=bluechords-db
API_ID=bluechords-api
APP_ID=bluechords-app

all: build run
	@echo "No default action"

status:
	@docker ps

run:
	@make db
	@make api
	@make app

rm:
	@make app-rm
	@make api-rm
	@make db-rm

###################################################
# DB
db-build:
	@./scripts/dockerctl.sh $(DB_ID) build db

db-run:
	@./scripts/dockerctl.sh $(DB_ID) start '-e MYSQL_ROOT_PASSWORD=root'

db-stop:
	@./scripts/dockerctl.sh $(DB_ID) stop

db-rm: db-stop
	@./scripts/dockerctl.sh $(DB_ID) rm 

db-ip:
	@docker inspect --format '{{ .NetworkSettings.IPAddress}}' $(DB_ID)

db: db-build db-run

###################################################
# API

api-build:
	@./scripts/dockerctl.sh $(API_ID) build api

api-run:
	@./scripts/dockerctl.sh $(API_ID) start '--link $(DB_ID):host-db -v $(shell pwd)/api/src:/var/www/html/api'

api-stop:
	@./scripts/dockerctl.sh $(API_ID) stop

api-rm: api-stop
	@./scripts/dockerctl.sh $(API_ID) rm 

api-ip:
	@docker inspect --format '{{ .NetworkSettings.IPAddress}}' $(API_ID)

api: api-build api-run



###################################################
# Application

app-build:
	@./scripts/dockerctl.sh $(APP_ID) build app

app-run:
	@./scripts/dockerctl.sh $(APP_ID) start '-p 9161:8081 --link $(API_ID):host-api -v $(shell pwd)/app:/app'

app-stop:
	@./scripts/dockerctl.sh $(APP_ID) stop

app-rm: app-stop
	@./scripts/dockerctl.sh $(APP_ID) rm 

app-ip:
	@docker inspect --format '{{ .NetworkSettings.IPAddress}}' $(APP_ID)

app: app-build app-run

app-install:
	docker exec $(APP_ID) bash -c "cd /app && npm install"

app-watch:
	docker exec $(APP_ID) bash -c "cd /app && gulp watch"

