import * as ActionTypes from '../constants/ActionTypes';

export default function records (records = [], action) {
    switch (action.type) {
        case ActionTypes.GET_RECORDS_SUCCESS:
            return action.records;
        default:
            return records;
    }
}