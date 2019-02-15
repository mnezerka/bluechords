import React, {Component} from 'react'
import {AUTH_TOKEN} from '../const'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Formik} from 'formik'

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
    }

    render()
    {
        const {login} = this.state

        return(
            <div className="bc-login">

                <Mutation
                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                    onCompleted={data => this._confirm(data)}
                    onError={console.log('error')}
                >
                    {mutation => (
                            <LoginForm
                                login={login}
                                onToggleLogin={() => {this.setState({login: !login})}}
                                onSubmit={mutation}/>
                    )}
                </Mutation>
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

class LoginForm extends Component
{
    state = {
        num1: Math.floor(Math.random()*10) + 1,
        num2: Math.floor(Math.random()*10) + 1,
    }

    validate(values) {

        let errors = {}

        // validate email
        if (!values.email) {
            errors.email = 'Required';
        } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        // validate password
        if (!values.password) {
            errors.password = 'Required';
        }

        // validate sum in case of signup dialog
        if (!this.props.login) {
            if (!values.sum) {
                errors.sum = 'Required';
            } else if (parseInt(values.sum) !== this.state.num1 + this.state.num2) {
                errors.sum = 'Invalid sum of numbers';
            }
        }

        return errors;
    }


    render()
    {
        return (
            <Formik
                initialValues={{email: '', password: '', sum: ''}}
                validate={this.validate.bind(this)}
                onSubmit={(values, {setSubmitting}) => {
                     console.log('formik submitting');
                     this.props.onSubmit({variables: values})
                     setSubmitting(false);
                }}
            >
                {({values, errors, touched, handleChange, handleSubmit, isSubmitting}) => (


                    <Form
                        onSubmit={handleSubmit}
                    >
                        <h4>{this.props.login ? 'Login' : 'Sign Up'}</h4>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address: <i>{touched.email && errors.email && errors.email}</i></Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={touched.email && errors.email}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password: <i>{touched.password && errors.password && errors.password}</i></Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={touched.password && errors.password}
                            />
                        </Form.Group>

                        {!this.props.login &&
                        <Form.Group controlId="formSum">
                            <Form.Label>{this.state.num1} + {this.state.num2} = {touched.sum && errors.sum && errors.sum}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="sum of numbers"
                                name="sum"
                                value={values.sum}
                                onChange={handleChange}
                                isInvalid={touched.sum && errors.sum}
                            />
                        </Form.Group>
                        }

                        <Button
                            block type="submit">{this.props.login ? 'Login' : 'Create Account'}</Button>

                        <div id="bc-login-toggle">
                            <Button block variant="outline-secondary" onClick={this.props.onToggleLogin}>
                                {this.props.login ? 'Need to create an account?': 'Already have an account?'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default Login
