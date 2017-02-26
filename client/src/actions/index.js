import * as types from '../constants/ActionTypes';

export const getRecords = () => {
    return (dispatch) => {
        dispatch({
            type: types.GET_RECORDS_REQUEST
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