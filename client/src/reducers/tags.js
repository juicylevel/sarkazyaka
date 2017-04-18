import * as ActionTypes from '../constants/ActionTypes';

const tags = (tags = [], action) => {
    switch (action.type) {
        case ActionTypes.RECEIVE_ALL_TAGS:
            return action.tags;
        default:
            return tags;
    }
};

export default tags;