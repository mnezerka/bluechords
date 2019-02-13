import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import Songs from './pages/Songs'
import Song from './pages/Song'
import SongEdit from './pages/SongEdit'


class App extends Component
{
    state = {
        filter: null,
    }

    render()
    {
        return (
            <div>
                <Header
                    onFilter={this.onFilter.bind(this)}
                />
                <div className="bc-content">
                    <Switch>
                        <Route exact path="/" render={props => (<Songs {...props} filter={this.state.filter}/>)} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/song/:id" component={Song} />
                        <Route exact path="/song-edit/:id?" component={SongEdit} />
                        <Route exact path="/song-editx(/:id)" component={SongEdit} />
                    </Switch>
                </div>

            </div>
        )
    }

    onFilter(filter)
    {
        this.setState({filter})
    }
}

export default App;
