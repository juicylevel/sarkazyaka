import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import records from './records';
import tags from './tags';
import subject from './subject';

const rootReducer = combineReducers({
    records: records,
    tags: tags,
    subject: subject,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;