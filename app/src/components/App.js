import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Songs from './Songs'
import SongModal from './SongModal'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'

const ACT_ADD_SONG = 'addsong';

const SONG_MUTATION = gql`
    mutation SongMutation($name: String!) {
        post(name: $name) {
            id
            name
            content
        }
    }
`

const SONGS_QUERY = gql`
    query GetSongs {
        songs {
            id
            name
            content
        }
    }
`

class App extends Component
{
    state = {
        action: null
    }

    addSong()
    {
        this.setState({action: ACT_ADD_SONG});
        this.forceUpdate()
    }

    render()
    {
        return (
            <div>
                <Header addSong={this.addSong.bind(this)}/>
                <div>
                    <Switch>
                        <Route exact path="/" component={Songs} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>

                {this.state.action === ACT_ADD_SONG &&
                    <Mutation
                        mutation={SONG_MUTATION}
                        update={(cache, {data: {post}}) => {
                            const {songs} = cache.readQuery({query: SONGS_QUERY})
                            cache.writeQuery({query: SONGS_QUERY, data: {songs: songs.concat([post])}})
                        }}
                        onCompleted={this.onCancelAction.bind(this)}
                    >
                        {(addSong, {data}) => (
                            <SongModal
                                onCancel={this.onCancelAction.bind(this)}
                                onSave={name => {addSong({variables: {name}})}}
                            />
                        )}
                    </Mutation>
                }
            </div>
        )
    }

    onCancelAction()
    {
        this.setState({action: null})
    }
}

export default App;
