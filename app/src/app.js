import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import rootReducer from 'reducers';
import App from 'containers/App';
//import Songs from 'containers/Songs';
//import Song from 'containers/Song';
//import SongEdit from 'containers/SongEdit';
//import SongEditNav from 'containers/SongEditNav';
//import SongsNav from 'containers/SongsNav';
//import SongNav from 'containers/SongNav';
//import Login from 'containers/Login';
import {loginUserSuccess} from 'actions/Auth';
//import requireAuth from 'components/AuthenticatedComponent';

const logger = createLogger();

// Add the reducer to your store on the `routing` key
const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    applyMiddleware(apiMiddleware, thunk, logger)
);

/*
const routes = ( 
    <Route path={config.path} component={App}>     // eslint-disable-line no-undef
        <IndexRoute components={{main: Songs, nav: SongsNav}}/>
        <Route path="songs/:songId" components={{main: Song, nav: SongNav}}/>
        <Route path="songs/:songId/edit" components={{main: requireAuth(SongEdit), nav: SongEditNav}}/>
        <Route path="login" components={{main: Login, nav: null}}/>
    </Route>
);
*/

// authentication stuff
let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}


ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App}/>
            </Switch>
        </Router>
    </Provider>
), document.getElementById('app'))
