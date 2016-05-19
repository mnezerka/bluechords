import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Label from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Alert from 'react-bootstrap/lib/Alert';
import * as actionCreators from 'actions/Auth';
import './Login.styl';

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText,
    error              : state.auth.error
});

const mapActionsToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class LoginPage extends React.Component {

    static propTypes = {
        isAuthenticating: React.PropTypes.bool,
        statusText: React.PropTypes.string,
        error: React.PropTypes.bool,
        actions: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    getValidationState() {
        if (this.state.login.length === 0) {
            return 'warning';
        }
        if (this.state.password.length === 0) {
            return 'warning';
        }

        return 'success';
    }

    render() {
        return (
            <div className="saas-login-form">
                <PageHeader>BluePass</PageHeader>
                {this.props.isAuthenticating &&
                    <Alert bsStyle="info">Authenticating...</Alert>}        

                {this.props.error &&
                    <Alert bsStyle="danger">Authentication failed ({this.props.statusText})</Alert>}        

                {!this.props.error && this.props.statusText !== null &&
                    <Alert bsStyle="info">{this.props.statusText}</Alert>}        

                <form>
                    <FormGroup
                        validationState={this.getValidationState()}>

                        <Label>Login</Label>
                        <FormControl
                            type="text"
                            value={this.state.login}
                            onChange={this.onChange.bind(this, 'login')}
                            placeholder="Enter login" />
                        <HelpBlock />

                        <Label>Password</Label>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange.bind(this, 'password')}
                            placeholder="Enter password" />
                    </FormGroup>

                    <Button
                        type="submit"
                        onClick={this.onLogin.bind(this)}>
                        Login</Button>
                </form>
            </div>
       );
    }

    onChange(ctrl, value) {
        this.setState({[ctrl]: value.target.value});
    }

    onLogin(e) {
        e.preventDefault();
        this.props.actions.loginUser(
            this.state.login,
            this.state.password,
            config.path).then((x) => {
                console.log('yes', x)
            });
    }
}


