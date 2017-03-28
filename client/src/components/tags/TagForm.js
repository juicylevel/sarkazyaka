import React, { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';

import FormField from '../form/FormField';
import themeFormConfig from './themeFormConfig';

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
                <FormField { ...themeFormConfig.name } />
                <FormField { ...themeFormConfig.color } />
                <FormField { ...themeFormConfig.number } />
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