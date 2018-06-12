import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import requireAuth from 'components/AuthenticatedComponent';
import {Navbar, Nav, NavItem,  Glyphicon} from 'react-bootstrap';
import * as actionCreatorsSongs from 'actions/Songs';
import './App.styl';
import SongInfoModal from 'components/SongInfoModal';
import {Route, Switch} from 'react-router-dom';
import Songs from 'containers/Songs';

const ACT_SONGS = 'songs';
const ACT_ADD = 'add';
const ACT_SONGBOOKS = 'songbooks';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapActionsToProps = (dispatch) => ({
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch),
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    static propTypes = {
        actionsSongs: React.PropTypes.object,
        location: React.PropTypes.object.isRequired,
        isAuthenticated: React.PropTypes.bool,
    }

    static defaultProps = {
        isAuthenticated: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            action: null
        };
    }

    render()
    {
        return (
            <div className="bc-container">

                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>BlueChords</Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                </Navbar>

                <div className="bc-content">

                    <div className="bc-menu">
                        <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.onAction.bind(this)}>
                            <NavItem eventKey={ACT_SONGS}>
                                <Glyphicon glyph="list"/>Songs
                            </NavItem>
                            <NavItem eventKey={ACT_ADD} disabled={!this.props.isAuthenticated}>
                                <Glyphicon glyph="plus"/>Add Song 
                            </NavItem>
                            {false &&
                            <NavItem eventKey={ACT_SONGBOOKS} disabled={true}>
                                <Glyphicon glyph="list-alt"/>Songbooks
                            </NavItem>
                            }
                        </Nav>
                    </div>

                    <Switch>
                        <Route exact path="/" component={requireAuth(Songs)}/>
                    </Switch>
                </div>

                <SongInfoModal
                    show={this.state.action === ACT_ADD}
                    onCancel={this.onActionCancel.bind(this)}
                    onSave={this.onSongAdd.bind(this)}
                /> 

            </div>
        )
    }

    onActionCancel()
    {
        this.setState({action: null});
    }

    onAction(action)
    {
        switch (action) {

        case ACT_SONGS:
            this.context.router.history.push(config.path); //eslint-disable-line no-undef
            break;

        case ACT_ADD:
            this.setState({action});
        }
    }

    onSongAdd(song)
    {
        this.setState({action: null});
        this.props.actionsSongs.addSong(song);
    }
}
