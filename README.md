# BlueChords

Web application for management of song lyrics stored in
[ChordPro](https://www.chordpro.org/chordpro/ChordPro-File-Format-Specification.html)
format

## Architecture

### Songs
* Each song is described by following attributes:
  * *name* - name of the song (doesn't have to be unique)
  * *content* - song text in ChrodPro format
  * *createdBy* - the user who created a song

## Resources ##

* [Hot To GraphQL - React + Apollo](https://www.howtographql.com/react-apollo)
* [Apollo GraphQL](https://www.apollographql.com)

## Get Started ##

**Clone the repository:**

```sh
git clone https://github.com/mnezerka/bluechords.git
```

**Start instance (container) of MongoDB and Prisma:**
```sh
docker-compose up -d
```

**Install prisma dependencies and deploy data model**

```sh
npm install prisma -g
cd prisma
prisma deploy
```

**Start GraphQL server:**

```sh
cd server
node src/index.js
```

**Check GraphQL server web UI:**

Open your browser at [http://localhost:4000](http://localhost:4000), see schema
(right tab)  and start sending queries:

```graphql
query {
     info
}
```

**Install web app dependencies and start web app:**

```sh
cd app
npm install
npm start
```

**Check web app:**

Open your browser at [http://localhost:3000](http://localhost:3000). You shoud see
UI of web application connected to GraphQL server.

## Implementation ##

See [app](app/README.md) for detailed information related to web *application*.

See [server](server/README.md) for detailed information related to *server*.
