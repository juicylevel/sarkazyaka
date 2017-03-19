import React, { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';

import FormField from '../form/FormField';
import { FormControl } from 'react-bootstrap';
import MaskedInput from 'react-bootstrap-maskedinput';
import ColorField from '../form/ColorField';

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Наименование надо заполнить';
    }
    return errors;
};

class TagForm extends Component {
    render () { 
        return (
            <form>
                <FormField name="name" label="Наименование" cmp={ FormControl } required={ true } help="Введите ФИОВведите ФИОВведите ФИОВведите ФИОВведите ФИО Введите ФИО Введите ФИО Введите ФИО Введите ФИО" />
                <FormField name="color" label="Цвет" cmp={ ColorField } />
            </form>
        );
    }

    componentDidMount () {
        const { tag, initialize } = this.props;
        initialize(tag);
    }
}

export default reduxForm({
    form: 'tagForm',
    validate
})(TagForm);