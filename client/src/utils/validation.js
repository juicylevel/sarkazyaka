import * as utils from './index';

export const required = (errTxt = 'Это поле обязательно') => value => 
    utils.isEmpty(value) ? errTxt : undefined;

export const taxId = (errTxt = 'Некорректный ИНН') => value => 
    value && !/^(0|[0-9]{10}|[0-9]{12})$/i.test(value) ? errTxt : undefined;