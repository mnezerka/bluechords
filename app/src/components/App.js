import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Songs from './Songs'
import Song from '../pages/Song'
import SongEdit from '../pages/SongEdit'
import SongModal from './SongModal'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'

const ACT_ADD_SONG = 'addsong';

const SONG_MUTATION = gql`
    mutation SongMutation($name: String!) {
        addSong(name: $name) {
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
        action: null,
        filter: null,
    }

    addSong()
    {
        this.setState({action: ACT_ADD_SONG});
    }

    render()
    {
        return (
            <div>
                <Header
                    addSong={this.addSong.bind(this)}
                    onFilter={this.onFilter.bind(this)}
                />
                <div className="bc-content">
                    <Switch>
                        <Route exact path="/" render={props => (<Songs {...props} filter={this.state.filter}/>)} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/song/:id" component={Song} />
                        <Route exact path="/song-edit/:id" component={SongEdit} />
                    </Switch>
                </div>

                {this.state.action === ACT_ADD_SONG &&
                    <Mutation
                        mutation={SONG_MUTATION}
                        update={(cache, {data: {addSong}}) => {
                            const {songs} = cache.readQuery({query: SONGS_QUERY})
                            cache.writeQuery({query: SONGS_QUERY, data: {songs: songs.concat([addSong])}})
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

    onFilter(filter)
    {
        this.setState({filter})
    }

    onCancelAction()
    {
        this.setState({action: null})
    }
}

export default App;
