import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Songs from './Songs'
import SongCreate from './SongCreate'

class App extends Component
{
    render()
    {
        return (
            <div className="center w85">
                <Header />
                <div className="ph3 pv1 background-gray">
                    <Switch>
                        <Route exact path="/" component={Songs} />
                        <Route exact path="/create" component={SongCreate} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App;
