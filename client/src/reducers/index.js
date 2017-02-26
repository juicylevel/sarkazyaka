import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import records from './records';

const rootReducer = combineReducers({
    records: records,
    routing: routerReducer
});

export default rootReducer;