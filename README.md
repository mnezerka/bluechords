# BlueChords

Web application for management of song lyrics stored in
[ChordPro](https://www.chordpro.org/chordpro/ChordPro-File-Format-Specification.html)
format

## Requirements

Phase 1 (prototype)

* Authentication - user can login/sighnup
* Default page shows list of songs (only names) with possibility to search and
  filter, no need to login
* Each song is described by following attributes:
  * *name* - name of the song (doesn't have to be unique)
  * *content* - song text in ChrodPro format
  * *createdBy* - the user who created a song
* Possibility to add new song
* Possibility to edit song (both name and content)
* Possibility to delete song
* All data modifications are protected - user login is requested
* (optional) History of changes

Phase 2

* View of song provides transpose functionality (just for rendering, no changes
  are stored)
* Live preview when editing/creating song
* Songs can be tagged (e.g. #metallica,#metal)
* Songs can be filtered by tags
* Export song to PDF

Phase 3

* Songs can be grouped into Songbooks, each song can be transposed
* Songbook is described by:
  * *name* - songbook name (doesn't have to be unique)
  * *owner* - user that owns a songbook
* Fitting of song to page when exporting to PDF (use as large font size as
  possible)
* Export of Songbook to PDF

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
