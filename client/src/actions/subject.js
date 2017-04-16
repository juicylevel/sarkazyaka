import _ from 'lodash';
import { push } from 'react-router-redux'
import * as types from '../constants/ActionTypes';
import * as api from '../api';

export const displaySubjects = () => dispatch => {
    console.log('displaySubjects', dispatch);
    dispatch(push('/subjects'));
}

export const fetchSubjects = () => {
    return dispatch => {
        api.getAllTags().then((tags) => {
            dispatch({ type: types.RECEIVE_ALL_TAGS, tags: tags });
        });
    }
}

export const createSubject = () => ({
    type: types.CREATE_SUBJECT
})

export const editSubject = (id) => {
    return (dispatch, getState) => {
        const subject = _.find(getState().tags, tag => tag.id === id);
        subject && dispatch({ 
            type: types.EDIT_SUBJECT, 
            data: subject
        })
    }
}

export const saveSubject = (values) => dispatch => {
    console.log(values);
    const method = values.id ? 'updateSubject' : 'createSubject';
    api[method](values).then(() => {
        dispatch(closeSubject());
    });
}

export const closeSubject = () => ({
    type: types.CLOSE_SUBJECT
})