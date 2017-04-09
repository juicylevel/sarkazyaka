import _ from 'lodash';
import * as api from '../api';
import * as types from '../constants/ActionTypes';

export const getRecords = () => {
    return (dispatch) => {
        dispatch({
            type: types.GET_RECORDS_REQUEST
        });

        api.getAllTags().then((tags) => {
            console.log('tags', tags);
        });

        console.log('выполняется запрос getRecords...');
        setTimeout(() => {
            const records = [];
            for (var i = 0; i < 50; i++) {
                records.push({
                    id: (i + 1),
                    name: 'record ' + (i + 1)
                }); 
            }
            console.log('запрос getRecords успешно выполнен!');
            dispatch({
                type: types.GET_RECORDS_SUCCESS,
                records: records
            });
        }, 5000);
    }
};

export const fetchTags = () => {
    return dispatch => {
        api.getAllTags().then((tags) => {
            dispatch({ type: types.RECEIVE_ALL_TAGS, tags: tags });
        });
    }
}

export const editTag = (id) => {
    return (dispatch, getState) => {
        const tag = _.find(getState().tags, tag => tag.id === id);
        tag && dispatch({ type: types.EDIT_TAG, tag: { ...tag, select: 3, date: '2017-03-11', switch: true } });
    }
}

export const completeEditTag = () => ({
    type: types.COMPLETE_EDIT_TAG
});