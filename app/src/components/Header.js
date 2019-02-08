import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {AUTH_TOKEN} from '../const'
import {Navbar} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import SongModal from './SongModal'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ACT_SONGS = 'songs';
const ACT_ADD = 'add';
const ACT_LOGIN = 'login';
const ACT_LOGOUT = 'logout';

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

class Header extends Component
{
    state = {
        action: null,
        songName: null,
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

                    {false &&
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button>Search</Button>
                    </Form>
                    }

                </Navbar>

                {this.state.action === ACT_ADD &&
                    <Mutation
                        mutation={SONG_MUTATION}
                        onCompleted={this.onCancelAction.bind(this)}
                    >
                        {(post, {data}) => (
                            <SongModal
                                onCancel={this.onCancelAction.bind(this)}
                                onSave={name => {post({variables: {name}})}}
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

    onAction(action) {
        console.log(action)
        switch(action)
        {
        case ACT_SONGS:
            this.props.history.push('/')
            break;
        case ACT_ADD:
            //this.props.history.push('/create')
            this.setState({action})
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
