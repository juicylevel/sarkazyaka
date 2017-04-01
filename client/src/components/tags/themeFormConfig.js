import { FormControl } from 'react-bootstrap';
import ColorField from '../form/ColorField';
import NumberField from '../form/NumberField';

import * as v from '../../utils/validation';

const themeFormConfig = {
    name: {
        name: 'name',
        label: 'Наименование',
        placeholder: 'введите наименование темы',
        help: 'Наименование темы должно выражать основную суть сарказяк',
        required: true,
        cmp: FormControl,
        validate: [
            v.required('Наименование не заполнено')
        ]
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
        maxLength: 12,
        validate: [
            v.required('ИНН необходимо заполнить'),
            v.taxId('ИНН должен состоять из 10 или 12 чисел')
        ]
    },
    bigtext: {
        name: 'bigtext',
        label: 'Большой текст',
        placeholder: 'введите текст',
        help: 'Введите много текста',
        cmp: FormControl,
        componentClass: 'textarea',
        maxLength: 210
    }
};

export default themeFormConfig;