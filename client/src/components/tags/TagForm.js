import React from 'react';
import { reduxForm } from 'redux-form';

import FormField from '../form/FormField';
import { FormControl } from 'react-bootstrap';
import MaskedInput from 'react-bootstrap-maskedinput';
import ColorField from '../form/ColorField';

const TagForm = () => (
    <form>
        <FormField name="name" label="Имя" cmp={ FormControl } required={ true } help="Введите ФИОВведите ФИОВведите ФИОВведите ФИОВведите ФИО Введите ФИО Введите ФИО Введите ФИО Введите ФИО" />
        <FormField name="color" label="Цвет" cmp={ ColorField } />
        <FormField name="message" label="Сообщение" cmp={ FormControl } required={ true } componentClass="textarea" help="Введите большой текст" />
        <FormField name="phone" label="Телефон" labelAlign="top" cmp={ MaskedInput } mask="+7 (111) 111-11-11" help="Введите телефон"/>
    </form>
);

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Поле "Имя" обязательно для заполнения';
    }
    return errors;
};

export default reduxForm({
    form: 'tagForm',
    validate,
    initialValues: {
        name: 'Антошка'
    }
})(TagForm);