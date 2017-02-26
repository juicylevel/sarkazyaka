import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import Records from './components/Records';
import Tags from './components/Tags';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const initialState = {
    records: []
};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Records} />
                <Route path="tags" component={Tags} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
