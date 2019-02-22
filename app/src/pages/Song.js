import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {AUTH_TOKEN} from '../const'
import gql from 'graphql-tag'
//import {Link} from 'react-router-dom'
import {Mutation} from 'react-apollo'
import ChordProView from '../components/ChordProView'
import {SONG_QUERY} from '../queries/Songs'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const SONG_DELETE = gql`
    mutation DeleteSong($id: ID!) {
        deleteSong(id: $id) { id }
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
                            <ChordProView>{data.song.content || ''}</ChordProView>

                            {authToken && (
                                <Mutation
                                    mutation={SONG_DELETE}
                                    onCompleted={() => { this.props.history.push('/')}}
                                >
                                    {(deleteSong) => (
                                        <ButtonToolbar>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={e => {this.props.history.push('/song-edit/' + data.song.id)}}>Edit</Button>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={e => {
                                                    e.preventDefault()
                                                    deleteSong({variables: {id}})
                                                }}>Delete</Button>
                                        </ButtonToolbar>
                                    )}
                                </Mutation>
                            )}

                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default Song
