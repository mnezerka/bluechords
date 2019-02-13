import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {AUTH_TOKEN} from '../const'
import {Navbar} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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

    render()
    {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <div className="bc-container">

                <Navbar fluid="true">
                    <Navbar.Brand>BlueChords</Navbar.Brand>
                    <Navbar.Toggle />

                    <Nav variant="pills" className="mr-auto" activeKey={1} onSelect={this.onAction.bind(this)}>
                        <Nav.Link eventKey={ACT_SONGS}>Songs</Nav.Link>
                        <Nav.Link eventKey={ACT_ADD} disabled={!authToken}>Add Song</Nav.Link>
                        {authToken ? (
                                <Nav.Link eventKey={ACT_LOGOUT}>Logout</Nav.Link>
                            ) : (
                                <Nav.Link eventKey={ACT_LOGIN}>Login</Nav.Link>
                            )
                        }
                    </Nav>

                    <Form inline noValidate onSubmit={e => {e.preventDefault()}}>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            value={this.state.filter}
                            onChange={(e) => {this.setState({filter: e.target.value})}}
                            className="mr-sm-2" />
                        <Button type="submit" onClick={() => this.props.onFilter(this.state.filter)}>Search</Button>
                    </Form>

                </Navbar>
            </div>
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
