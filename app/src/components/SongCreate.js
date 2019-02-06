import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const SONG_MUTATION = gql`
mutation SongMutation($name: String!)
{
    post(name: $name)
    {
        id
        name
        content
    }
}
`

class CreateSong extends Component
{
    state = {
        name: '',
        content: '',
    }

    render()
    {
        const {name, content} = this.state

        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={name}
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        placeholder="Name for the song"
                    />

                    <textarea
                        className="mb2"
                        value={content}
                        onChange={e => this.setState({content: e.target.value })}
                        type="textarea"
                        placeholder="Song lyrics"
                    />

                </div>

                <Mutation
                    mutation={SONG_MUTATION}
                    variables={{name}}
                    onCompleted={() => this.props.history.push('/')}
                >
                    {postMutation => <button onClick={postMutation}>Submit</button>}
                </Mutation>

            </div>
        )
    }
}

export default CreateSong
