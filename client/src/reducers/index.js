import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import records from './records';
import tags from './tags';
import editedTag from './editedTag';

const rootReducer = combineReducers({
    records: records,
    tags: tags,
    editedTag: editedTag,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;