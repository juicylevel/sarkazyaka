import * as types from '../constants/ActionTypes';

const editedTag = (tag = {}, action) => {
    switch (action.type) {
        case types.EDIT_TAG:
            return action.tag;
        case types.COMPLETE_EDIT_TAG:
            return {};
        default:
            return tag;
    }
}

export default editedTag;