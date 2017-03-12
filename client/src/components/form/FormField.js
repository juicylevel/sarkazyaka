import React from 'react';
import { Field } from 'redux-form';
import HFieldGroup from './HFieldGroup';
import VFieldGroup from './VFieldGroup';

const renderField = (props) => {
    const { input, type, label, labelAlign, cmp, help, required, meta, ...rest } = props;
    const FieldComponent = cmp;
    const FieldGroup = !labelAlign || labelAlign === 'left' ? HFieldGroup : VFieldGroup;
    const hasError = meta.error && meta.touched;
    let message, validationState;

    if (meta.error && meta.touched) {
        message = meta.error; 
        validationState = 'error';
    }

    return (
        <FieldGroup label={ label } help={ help } required={ required } message={ message } validationState={ validationState }>
            <FieldComponent {...input} type={ type } {...rest} />  
        </FieldGroup>
    );
};

const FormField = (props) => (
    <Field { ...props } component={ renderField } />
);

export default FormField;