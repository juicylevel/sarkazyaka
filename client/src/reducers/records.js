import * as types from '../constants/ActionTypes';

export default function records (records = [], action) {
    switch (action.type) {
        case types.GET_RECORDS:
            return records;
        default:
            return records;
    }
}