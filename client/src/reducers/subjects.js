import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    loading: false,
    data: []
};

const subjects = (subjects = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOAD_ALL_SUBJECTS:
            return {
                ...subjects,
                loading: true
            };
        case ActionTypes.LOAD_ALL_SUBJECTS_SUCCESS:
            return {
                ...subjects,
                data: action.data,
                loading: false
            };
        case ActionTypes.LOAD_ALL_SUBJECTS_ERROR:
            return {
                ...subjects,
                loading: false
            };
        default:
            return subjects;
    }
};

export default subjects;