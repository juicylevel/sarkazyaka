import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import records from './records';
import subjects from './subjects';
import subject from './subject';

const rootReducer = combineReducers({
    records: records,
    subjects: subjects,
    subject: subject,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;