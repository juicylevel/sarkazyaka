import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialState) => (
    createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
            routerMiddleware(browserHistory)
        )
    )
);

export default configureStore;