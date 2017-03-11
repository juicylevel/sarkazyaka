import React from 'react';
import { reduxForm } from 'redux-form';

import FormField from '../form/fields/FormField';
import { FormControl } from 'react-bootstrap';
import MaskedInput from 'react-bootstrap-maskedinput';
import ColorField from '../form/fields/ColorField';

const TagForm = () => (
    <form>
        <FormField name="name" label="Имя" cmp={ FormControl } />
        <FormField name="color" label="Цвет" cmp={ ColorField } />
        <FormField name="message" label="Сообщение" cmp={ FormControl } componentClass="textarea" />
        <FormField name="phone" label="Телефон" cmp={ MaskedInput } mask="+7 (111) 111-11-11" />
    </form>
);

const validate = (values) => {
    const errors = {};
    return errors;
};

export default reduxForm({
    form: 'tagForm',
    validate,
    initialValues: {
        name: 'Антошка'
    }
})(TagForm);