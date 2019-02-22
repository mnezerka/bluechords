import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {AUTH_TOKEN} from '../const'
import {Navbar} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import jwt from 'jsonwebtoken';
import {USER_QUERY} from '../queries/Users'
import {Query} from 'react-apollo'

const ACT_SONGS = 'songs';
const ACT_ADD = 'add';
const ACT_LOGIN = 'login';
const ACT_LOGOUT = 'logout';

class Header extends Component
{
    state = {
        action: null,
        songName: null,
        filter: ''
    }

    renderUserItem()
    {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        let authData = authToken ? jwt.decode(authToken) : {}
        let {userId} = authData;

        return (
            <Query query={USER_QUERY} variables={{id: userId}}>
                {({loading, error, data}) => {
                    if (loading || !data) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    return (
                        <Nav.Link eventKey={ACT_LOGOUT}>Logout ({data.user.email})</Nav.Link>
                    )
                }}
            </Query>
        )

    }


    render()
    {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        // detect if header is rendered for main page (list of songs)
        const songsPage = this.props.location.pathname === '/';

        return (
            <Navbar expand="lg">
                <Navbar.Brand>BlueChords</Navbar.Brand>

                {songsPage &&
                <Form inline noValidate onSubmit={e => {e.preventDefault()}}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        value={this.state.filter}
                        onChange={(e) => {this.setState({filter: e.target.value})}}
                        className="mr-sm-2" />
                    <Button
                        variant="secondary"
                        type="submit"
                        onClick={() => this.props.onFilter(this.state.filter)}>Search</Button>
                </Form>
                }


                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="ml-auto" activeKey={1} onSelect={this.onAction.bind(this)}>
                        {songsPage || <Nav.Link eventKey={ACT_SONGS}>Songs</Nav.Link>}
                        {songsPage && <Nav.Link eventKey={ACT_ADD} disabled={!authToken}>Add Song</Nav.Link>}
                        {authToken ?
                                this.renderUserItem()
                            : (
                                <Nav.Link eventKey={ACT_LOGIN}>Login</Nav.Link>
                            )
                        }
                    </Nav>


                </Navbar.Collapse>
            </Navbar>
        )
    }

    onCancelAction()
    {
        this.setState({action: null})
    }

    onAction(action)
    {
        switch(action)
        {
        case ACT_SONGS:
            this.props.history.push('/')
            break;
        case ACT_ADD:
            this.props.history.push('/song-edit')
            break;
        case ACT_LOGIN:
            this.props.history.push('/login')
            break;
        case ACT_LOGOUT:
            localStorage.removeItem(AUTH_TOKEN)
            this.props.history.push(`/`)
            break;
        default:
        }
    }
}

export default withRouter(Header)
