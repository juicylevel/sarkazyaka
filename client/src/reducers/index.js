import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import records from './records';
import tags from './tags';

const rootReducer = combineReducers({
    records: records,
    tags: tags,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;