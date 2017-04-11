import React, { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';

import FormField from '../form/FormField';
import themeFormConfig from './themeFormConfig';

const validate = (values) => {
    const errors = {};
    console.log('validate values', values);
    if (!values.name) {
        errors.name = 'Наименование надо заполнить';
    }

    if (values.docDate && !/^(\d{4})-(\d{2})-(\d{2})/i.test(values.docDate)) {
        errors.docDate = 'Некорректная дата';
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
                <FormField { ...themeFormConfig.switch } />
                <FormField { ...themeFormConfig.docDate } />
            </form>
        );
    }

    /*componentDidMount () {
        const { tag, initialize } = this.props;
        initialize(tag);
    }*/
}

export default reduxForm({
    form: 'tagForm',
    validate
})(TagForm);