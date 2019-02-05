import React, { Component } from 'react'
import Song from './Song'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const SONGS_QUERY = gql`
{
    songs {
        id
        name
    }
}
`

class Songs extends Component
{
    render()
    {
        return (
            <Query query={SONGS_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const songsToRender = data.songs

                    return (
                        <div>
                            {songsToRender.map(song => <Song key={song.id} song={song} />)}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Songs
