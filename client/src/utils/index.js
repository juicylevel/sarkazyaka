import _ from 'lodash';

export const isEmpty = (value) => {
    if (_.isObject(value)) {
        return _.isEmpty(value);
    } else {
        return (value === null) || (value === undefined) || value === '' || (_.isArray(value) && value.length === 0);
    }
}