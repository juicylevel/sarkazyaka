import _ from 'lodash';
import { push } from 'react-router-redux'
import * as ActionTypes from '../constants/ActionTypes';
import * as api from '../api';

export const displaySubjects = () => dispatch => {
    dispatch(push('/subjects'));
}

export const fetchSubjects = () => {
    return dispatch => {
        api.getAllTags().then((tags) => {
            dispatch({ type: ActionTypes.RECEIVE_ALL_TAGS, tags: tags });
        });
    }
}

export const createSubject = () => ({
    type: ActionTypes.CREATE_SUBJECT
})

export const editSubject = (id) => {
    return (dispatch, getState) => {
        const subject = _.find(getState().tags, tag => tag.id === id);
        subject && dispatch({ 
            type: ActionTypes.EDIT_SUBJECT, 
            data: subject
        })
    }
}

export const closeSubject = () => ({
    type: ActionTypes.CLOSE_SUBJECT
})

export const saveSubject = (values) => dispatch => {
    const method = values.id ? 'updateSubject' : 'createSubject';

    return api[method](values).then(() => {
        dispatch(closeSubject());
        dispatch(fetchSubjects());
    }, error => {

    });
}