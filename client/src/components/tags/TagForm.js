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

const data = [{ 
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
        }];

class TagForm extends Component {
    render () { 
        return (
            <form>
                <FormField { ...themeFormConfig.name } />
                <FormField { ...themeFormConfig.color } />
                <FormField { ...themeFormConfig.number } />
                <FormField { ...themeFormConfig.bigtext } />
                <FormField { ...themeFormConfig.select } />
                <FormField { ...themeFormConfig.date } />
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