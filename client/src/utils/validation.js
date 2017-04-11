import * as utils from './index';

export const required = (errTxt = 'Это поле обязательно') => value => 
    utils.isEmpty(value) || value === 'Invalid date' ? errTxt : undefined;

export const taxId = (errTxt = 'Некорректный ИНН') => value => 
    value && !/^(0|[0-9]{10}|[0-9]{12})$/i.test(value) ? errTxt : undefined;

export const docDate = (errTxt = 'Некорректная дата') => value =>
    value && !/^(\d{4})-(\d{2})-(\d{2})/i.test(value) ? errTxt : undefined;