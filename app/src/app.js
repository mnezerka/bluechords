import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'; 
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import rootReducer from 'reducers';
import App from 'containers/App';
import Songs from 'containers/Songs';
import Song from 'containers/Song';
import SongsNav from 'containers/SongsNav';
import BasicNav from 'containers/BasicNav';

const logger = createLogger();

// Add the reducer to your store on the `routing` key
const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    applyMiddleware(apiMiddleware, thunk, logger)
);

const routes = ( 
    <Route path="/" component={App}>
        <IndexRoute components={{main: Songs, nav: SongsNav}}/>
        <Route path="songs/:songId" components={{main: Song, nav: BasicNav}}/>
    </Route>
);

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
    </Provider>
), document.getElementById('app'))
