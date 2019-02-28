import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'
import {SONGS_QUERY} from '../queries/Songs'
import {SONGS_PER_PAGE} from '../const'
import Button from 'react-bootstrap/Button';

class Songs extends Component
{
   constructor(...args)
    {
        super(...args);

        this.state = {
            pages: 1,
        }
    }

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
                variables={{filter: this.props.filter || null, skip: 0, first: SONGS_PER_PAGE * this.state.pages}}
            >
                {({loading, error, data}) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const songsToRender = data.songs

                    const allowLoadMore = data.songs.length === this.state.pages * SONGS_PER_PAGE;

                    return (
                        <div>
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

                            <Button block disabled={!allowLoadMore} variant="outline-secondary" onClick={this.onLoadMore.bind(this)}>Load more</Button>
                        </div>
                    )
                }}
            </Query>
        )
    }

    onLoadMore()
    {
        this.setState({pages: this.state.pages + 1});
    }

}

export default Songs
