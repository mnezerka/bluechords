import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import SongForm from '../components/SongForm'
import {SONG_QUERY} from '../queries/Songs'

const SONG_ADD = gql`
    mutation SongAdd($name: String!, $artist: String, $content: String!) {
        addSong(name: $name, artist: $artist, content: $content) {
            id
            name
            artist
            content
        }
    }
`

const SONG_UPDATE = gql`
    mutation UpdateSong($id: ID!, $name: String!, $artist: String, $content: String!) {
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

    renderForm(song, onSubmit, onCancel)
    {
        return(
            <SongForm song={song} onSubmit={onSubmit} onCancel={this.onCancel.bind(this)} />
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
                        <Mutation
                            mutation={SONG_UPDATE}
                            onCompleted={(result) => { this.props.history.push('/song/' + result.updateSong.id)}}
                        >
                            {(updateSong) => this.renderForm(data.song, (formData) => {
                                const {name, artist, content} = formData;
                                updateSong({variables: {id: data.song.id, name, artist, content}})
                            })}
                        </Mutation>
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
                    onCompleted={(data) => {this.props.history.push('/song/' + data.addSong.id)}}
                >
                   {(addSong, {data}) => this.renderForm({name: '', content: ''}, (formData) => {
                        addSong({variables: {name: formData.name || '', artist: formData.artist || '', content: formData.content}})
                    })}
                </Mutation>
            </div>
        )
    }

    render()
    {
        // get id passed as part of page url
        const id = this.props.match.params.id

        // if we received id => edit existing song
        if (id) {
            return this.renderEdit(id);
        }

        // else we are creating new song (without id)
        return this.renderAdd();
    }

    onCancel()
    {
        // get id passed as part of page url
        const id = this.props.match.params.id

        // if we received id => go back to song view
        if (id) {
            this.props.history.push('/song/' + id);
        } else {
            // if we dont' have song id (adding new song), we go
            // back to list of songs
            this.props.history.push('/');
        }
    }
}


export default SongEdit
