import React from 'react';
import {Navbar, Nav, NavItem, FormGroup, Button, FormControl, Glyphicon} from 'react-bootstrap';
//import brace from 'brace';
import './App.styl';


const ACT_SONGS = 'songs';
const ACT_ADD = 'add';
const ACT_SONGBOOKS = 'songbooks';

export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        children: React.PropTypes.object,
    }

    render() {
        if (this.props.location.pathname === '/login') {
            return this.props.main;
        }

        return (
            <div className="bc-container">
                {this.props.nav}

                <div className="bc-content">

                    <div className="bc-menu">
                        <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.onAction.bind(this)}>
                            <NavItem eventKey={ACT_SONGS}>
                                <Glyphicon glyph="list"/>Songs
                            </NavItem>
                            <NavItem eventKey={ACT_ADD} disabled={true}>
                                <Glyphicon glyph="plus"/>Add Song 
                            </NavItem>
                            <NavItem eventKey={ACT_SONGBOOKS} disabled={true}>
                                <Glyphicon glyph="list-alt"/>Songbooks
                            </NavItem>

                        </Nav>
                    </div>
   
                    {this.props.main}
                </div>
            </div>
        )
    }


    onAction(action) {
        console.log('action:', action);
        switch (action) {
        case ACT_SONGS:
            this.context.router.push('/');
            break;
        }

    }
}


