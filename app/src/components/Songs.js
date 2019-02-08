import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Table from 'react-bootstrap/Table'

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
    renderSong(song)
    {
        return(
            <tr key={song.id}>
                <td>{song.name}</td>
            </tr>
        )
    }

    render()
    {
        return (
            <Query query={SONGS_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const songsToRender = data.songs

                    return (
                        <Table size="sm" striped={true}>
                            <tbody>
                            {songsToRender.map(song => this.renderSong(song))}
                            </tbody>
                        </Table>
                    )
                }}
            </Query>
        )
    }
}

export default Songs
