import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'
import {SONGS_QUERY} from '../queries/Songs'

class Songs extends Component
{
    renderSong(song)
    {
        return (
            <tr key={song.id}>
                <td><Link to={'/song/' + song.id}>{song.name}</Link></td>
                <td>{song.artist ? song.artist : ''}</td>
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
                        <table className="bc-songs-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Artist</th>
                                </tr>
                            </thead>
                            <tbody>
                            {songsToRender.map(song => this.renderSong(song))}
                            </tbody>
                        </table>
                    )
                }}
            </Query>
        )
    }
}

export default Songs
