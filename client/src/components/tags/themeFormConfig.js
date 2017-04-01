import { FormControl } from 'react-bootstrap';
import ColorField from '../form/ColorField';
import NumberField from '../form/NumberField';

const themeFormConfig = {
    name: {
        name: 'name',
        label: 'Наименование',
        placeholder: 'введите наименование темы',
        help: 'Наименование темы должно выражать основную суть сарказяк',
        required: true,
        cmp: FormControl
    },
    color: {
        name: 'color',
        label: 'Цвет',
        cmp: ColorField
    },
    number: {
        name: 'number',
        label: 'Число',
        placeholder: 'введите число',
        help: 'Число должно быть чётным',
        required: true,
        cmp: NumberField,
        maxLength: 10
    }
};

export default themeFormConfig;