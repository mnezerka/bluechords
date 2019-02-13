import gql from 'graphql-tag'

export const SONG_QUERY = gql`
    query Song($id: ID!) {
        song(id: $id) {
            id
            name
            artist
            content
        }
    }
`

export const SONGS_QUERY = gql`
    query GetSongs($filter: String) {
        songs(filter: $filter, orderBy: name_ASC) {
            id
            name
            artist
            content
        }
    }
`
