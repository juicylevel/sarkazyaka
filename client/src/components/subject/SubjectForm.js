import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, FormControl } from 'react-bootstrap';
import FormField from '../form/FormField';
import ColorField from '../form/ColorField';
import * as v from '../../utils/validation';

const fields = {
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
    }
}

const SubjectForm = () => (
    <Form>
        <FormField { ...fields.name } />
        <FormField { ...fields.color } />
    </Form>
)

export default reduxForm({ form: 'subjectForm' })(SubjectForm);