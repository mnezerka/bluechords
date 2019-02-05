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

## Development ##

See [app](app/README.md) for detailed information related to web *application*.

See [server](server/README.md) for detailed information related to *server*.
