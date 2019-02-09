import React, { Component } from 'react'
import { Query } from 'react-apollo'
import {AUTH_TOKEN} from '../const'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

const SONG_QUERY = gql`
    query Song($id: ID!) {
        song(id: $id) {
            id
            name
            content
        }
    }
`

class Song extends Component
{
    constructor(...args)
    {
        super(...args);
        this.state = {
            action: null
        }
    }

    render()
    {
        const id = this.props.match.params.id

        const authToken = localStorage.getItem(AUTH_TOKEN);

        return (
            <Query query={SONG_QUERY} variables={{id}}>
                {({loading, error, data}) => {
                    if (loading || !data) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    return (
                        <div>
                            {authToken && (
                                <Link to={'/song-edit/' + data.song.id}>Edit</Link>
                            )}
                            <h1>{data.song.name}</h1>
                            <p>{data.song.content}</p>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Song
