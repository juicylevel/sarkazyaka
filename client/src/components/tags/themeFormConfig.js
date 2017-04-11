import { FormControl } from 'react-bootstrap';
import { DropdownField, DateTimeField, SwitchField } from '../form/ReactWidgets';
import ColorField from '../form/ColorField';
import NumberField from '../form/NumberField';
import DocDateField from '../form/DocDateField';

import * as v from '../../utils/validation';

import moment from 'moment';
import momentLocaliser from 'react-widgets/lib/localizers/moment';

moment.locale('ru');
momentLocaliser(moment);

const themeFormConfig = {
    name: {
        name: 'name',
        label: 'Наименование',
        placeholder: 'введите наименование темы',
        help: 'Наименование темы должно выражать основную суть сарказяк',
        required: true,
        cmp: FormControl/*,
        validate: [
            v.required('Наименование не заполнено')
        ]*/
    },
    color: {
        name: 'color',
        label: 'Цвет',
        cmp: ColorField
    },
    number: {
        name: 'number',
        label: 'ИНН',
        placeholder: 'введите свой ИНН',
        help: 'ИНН должен состоять из 10, 15 или 20 чисел',
        required: true,
        cmp: NumberField,
        maxLength: 12/*,
        validate: [
            v.required('ИНН необходимо заполнить'),
            v.taxId('ИНН должен состоять из 10 или 12 чисел')
        ]*/
    },
    bigtext: {
        name: 'bigtext',
        label: 'Большой текст',
        placeholder: 'введите текст',
        help: 'Введите много текста',
        cmp: FormControl,
        componentClass: 'textarea',
        maxLength: 210
    },
    select: {
        name: 'select',
        label: 'Выбор из списка',
        help: 'Выберите цифру из списка',
        required: true,
        cmp: DropdownField,
        valueField: 'value',
        textField: 'name',
        data: [{ 
            name: '5', 
            value: 5
        }, { 
            name: '4', 
            value: 4
        }, { 
            name: '3', 
            value: 3
        }, { 
            name: '2', 
            value: 2
        }, { 
            name: '1', 
            value: 1
        }]/*,
        validate: [
            v.required('Нужно ввести число')
        ]*/
    },
    date: {
        name: 'date',
        label: 'Дата',
        placeholder: 'ДД.ММ.ГГГГ',
        help: 'Дата в формате DD.MM.YYYY',
        required: true,
        cmp: DateTimeField,
        showTime: false,
        parse: str => moment(str).format('YYYY-MM-DD')/*,
        validate: [
            v.required('Дату необходимо заполнить')
        ]*/
    },
    switch: {
        name: 'switch',
        label: 'Переключатель',
        cmp: SwitchField,
        onText: 'Вкл.',
        offText: 'Выкл.',
        onColor: 'success',
        offColor: 'default',
        width: 70
    },
    docDate: {
        name: 'docDate',
        label: 'Ввод даты',
        placeholder: 'ДД.ММ.ГГГГ',
        help: 'Дата в формате DD.MM.YYYY',
        required: true,
        cmp: DocDateField,
        validate: [
            v.required('Нужно ввести дату')
        ]
    }
};

export default themeFormConfig;