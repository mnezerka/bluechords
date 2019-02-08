import React, {Component} from 'react'
import {AUTH_TOKEN} from '../const'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SIGNUP_MUTATION = gql`
mutation SignupMutation($email: String!, $password: String!)
{
    signup(email: $email, password: $password)
    {
        token
    }
}
`
const LOGIN_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!)
{
    login(email: $email, password: $password)
    {
        token
    }
}
`

class Login extends Component
{
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
    }

    render()
    {
        const {login, email, password} = this.state

        return(
            <div>
                <h4>{login ? 'Login' : 'Sign Up'}</h4>

                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                    </Form.Group>

                    <Mutation
                        mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                        variables={{email, password}}
                        onCompleted={data => this._confirm(data)}
                    >
                        {mutation => (
                            <Button onClick={mutation}>
                                {login ? 'Login' : 'Create Account'}
                            </Button>
                        )}
                    </Mutation>


                    <Button onClick={() => this.setState({ login: !login })}>
                        {login ? 'Need to create an account?' : 'Already have an account?'}
                    </Button>
                </Form>
            </div>
        )
    }

    _confirm = async data => {
        const {token} = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default Login
