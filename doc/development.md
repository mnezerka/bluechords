# BlueChords Development

Restart GraphQL server after changes in schema, resolvers or after new prisma
client is generated:
```
docker-compose restart server
```

Deploy changes to prisma server on change of data schema:
```
docker-compose exec server prisma deploy
```

Regenerate prisma js client, which is part of server (this step is executed as
part of prisma deployment). Be aware that server needs to be restarted to apply
changes:
```
docker-compose exec server prisma generate
```
