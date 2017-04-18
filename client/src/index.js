import React from 'react';
import ReactDOM from 'react-dom';

// import moment from 'moment';
// import momentLocalizer from 'react-widgets/lib/localizers/moment';

import './index.css';

import App from './App';
import Records from './components/Records';
import Subjects from './components/subject/Subjects';
import NotFound from './components/NotFound';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// momentLocalizer(moment);

const initialState = {
    records: []
};

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Records } />
                <Route path="subjects" component={ Subjects } />
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
