import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import {Link} from 'react-router-dom'
import SongForm from '../components/SongForm'
import {SONG_QUERY} from '../queries/Songs'

const SONG_ADD = gql`
    mutation SongAdd($name: String!, $content: String!) {
        addSong(name: $name, content: $content) {
            id
            name
            artist
            content
        }
    }
`

const SONG_UPDATE = gql`
    mutation UpdateSong($id: ID!, $name: String!, $artist: String!, $content: String!) {
        updateSong(id: $id, name: $name, artist: $artist, content: $content) {
            id
            name
            artist
            content
        }
    }
`

class SongEdit extends Component
{

    renderForm(song, onSubmit)
    {
        return(
            <SongForm song={song} onSubmit={onSubmit} />
        )
    }

    renderEdit(id)
    {
        return (
            <Query query={SONG_QUERY} variables={{id}}>
                {({loading, error, data}) => {
                    if (loading || !data) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    return (
                        <div>
                            <Link to={'/song/' + data.song.id}>View</Link>
                            <Mutation
                                mutation={SONG_UPDATE}
                                onCompleted={() => { console.log('completed update')}}
                            >
                                {(updateSong) => this.renderForm(data.song, (formData) => {
                                    const {name, content} = formData;
                                    updateSong({variables: {id: data.song.id, name, content}})
                                })}
                                {(updateSong) => (

                                   <SongForm
                                        song={data.song}
                                        onSubmit={(formData) => {
                                            const {name, artist, content} = formData;
                                            updateSong({variables: {id: data.song.id, name, artist, content}})
                                        }}
                                   />
                                )}
                            </Mutation>
                        </div>
                    )
                }}
            </Query>
        )
    }

    renderAdd()
    {
        return (
            <div>
                <Mutation
                    mutation={SONG_ADD}
                    onCompleted={() => { console.log('completed add')}}
                >
                   {(addSong, {data}) => this.renderForm({name: '', content: ''}, (formData) => {
                        console.log('adding new song')
                        addSong({variables: {name: formData.name, content: formData.content}})
                    })}
                </Mutation>
            </div>
        )
    }

    render()
    {
        // get id passed as part of page url
        const id = this.props.match.params.id

        /*
        let song = this.props.song;
        song.content = song.content || '';
        song.artist = song.artist || '';
        */

        // if we received id => edit existing song
        if (id) {
            return this.renderEdit(id);
        }

        // else we are creating new song (without id)
        return this.renderAdd();
    }
}


export default SongEdit
