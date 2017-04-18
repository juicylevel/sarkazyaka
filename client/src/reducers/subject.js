import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    title: null,
    display: false,
    data: {}
};

const subject = (subject = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CREATE_SUBJECT:
            return { 
                data: { 
                    color: '#B8E986'
                },
                title: 'Новая тема',
                display: true
            };
        case ActionTypes.EDIT_SUBJECT:
            return { 
                data: action.data,
                title: 'Редактирование ' + action.data.name,
                display: true
            };
        case ActionTypes.CLOSE_SUBJECT:
            return {
                ...initialState
            };
        default:
            return subject;
    }
}

export default subject;