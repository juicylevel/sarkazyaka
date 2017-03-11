import React from 'react';
import { Field } from 'redux-form';
import HFieldGroup from './HFieldGroup';

const renderField = (props) => {
    const { input, type, label, labelAlign, cmp, meta, ...rest } = props;
    const FieldComponent = cmp;
    const FieldGroup = !labelAlign || labelAlign === 'left' ? HFieldGroup : HFieldGroup;

    return (
        <FieldGroup label={ label }>
            <FieldComponent {...input} type={ type } {...rest} />  
        </FieldGroup>
    );
};

const FormField = (props) => (
    <Field { ...props } component={ renderField } />
);

export default FormField;