import React from 'react';
import {connect} from 'react-redux';

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        static propTypes = {
            isAuthenticated: React.PropTypes.bool,
            location: React.PropTypes.any,
            dispatch: React.PropTypes.func,
        };

        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                //let redirectAfterLogin = this.props.location.pathname;
                //this.props.dispatch(push('/login?next=${redirectAfterLogin}'));
                this.context.router.push(config.path + 'login');
            }
        }

        render () {
            return this.props.isAuthenticated === true ? <Component {...this.props}/> : null;
        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}
