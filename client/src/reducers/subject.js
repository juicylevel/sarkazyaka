import * as types from '../constants/ActionTypes';

const subject = (subject = {}, action) => {
    switch (action.type) {
        case types.CREATE_SUBJECT:
            return { 
                data: { 
                    color: '#B8E986'
                },
                title: 'Новая тема',
                display: true
            };
        case types.EDIT_SUBJECT:
            return { 
                data: action.data,
                title: 'Редактирование ' + action.data.name,
                display: true
            };
        case types.CLOSE_SUBJECT:
            return {
                display: false
            };
        default:
            return subject;
    }
}

export default subject;