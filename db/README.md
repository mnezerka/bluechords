# DB

Useful commands:

```
docker-compose exec -T mysql mysql -ubc -pbc bc < schema.sql

docker-compose exec -T mysql mysql -ubc -pbc bc < seed_data.sql

docker-compose exec -T mysql mysql -ubc -pbc bc --execute "SHOW TABLES"
```
