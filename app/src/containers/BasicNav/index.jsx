import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Song';
import * as actionCreatorsAuth from 'actions/Auth';

import {Navbar, Nav, NavItem} from 'react-bootstrap';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userName: state.auth.userName
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSongs, dispatch),
    actionsAuth: bindActionCreators(actionCreatorsAuth, dispatch)
});

const ACT_SIGNOUT = 'action-signout'
const ACT_SIGNIN = 'action-signin'

@connect(mapStateToProps, mapActionsToProps)
export default class BasicNav extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        itemsLeft: React.PropTypes.array,
        itemsRight: React.PropTypes.array,
        isAuthenticated: React.PropTypes.bool,
        userName: React.PropTypes.string,
        children: React.PropTypes.any,
        actionsAuth: React.PropTypes.object,
    }

    static defaultProps = {
        title: 'BlueChords',
        subTitle: '',
        isAuthenticated: false,
        userName: ''
    }

    render() {
        let title = this.props.title;
        if (this.props.subTitle.length > 0) {
            title += ' - ' + this.props.subTitle;
        }
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>{title}</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight onSelect={this.onAction.bind(this)}>
                        {this.props.isAuthenticated &&
                        <NavItem eventKey={ACT_SIGNOUT} href="#">Sign out ({this.props.userName})</NavItem>}
                        {!this.props.isAuthenticated &&
                        <NavItem eventKey={ACT_SIGNIN} href="#">Sign in</NavItem>}
                    </Nav>
                    {this.props.children}
                </Navbar.Collapse>

            </Navbar>
        )
    }

    onAction(action) {
        switch (action) {
        case ACT_SIGNIN:
            this.context.router.push(config.path + 'login');
            break;
        case ACT_SIGNOUT:
            this.props.actionsAuth.logout();
            this.context.router.push(config.path + 'login');
            break;
        }
    }
}
