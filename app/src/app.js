import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import rootReducer from 'reducers';
import App from 'containers/App';

const logger = createLogger();

// Add the reducer to your store on the `routing` key
const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    applyMiddleware(apiMiddleware, thunk, logger)
);

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('app'))
