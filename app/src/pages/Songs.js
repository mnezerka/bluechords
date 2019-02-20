import React, {Component} from 'react'
import {Query} from 'react-apollo'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {SONGS_QUERY} from '../queries/Songs'

class Songs extends Component
{
    renderSong(song)
    {
        return (
            <tr key={song.id}>
                <td><Link to={'/song/' + song.id}>{song.name} {song.artist ? '(' + song.artist + ')' : null}</Link></td>
            </tr>
        )
    }

    render()
    {
        return (
            <Query
                query={SONGS_QUERY}
                fetchPolicy="network-only"
                variables={{filter: this.props.filter || null}}
            >
                {({loading, error, data}) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const songsToRender = data.songs

                    return (
                        <Table size="sm" striped={true}>
                            <thead>
                                <tr>
                                    <th>Name (Artist)</th>
                                </tr>
                            </thead>
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
