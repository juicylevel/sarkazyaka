import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import * as utils from '../../utils';

const isoRegexp = /^(\d{4})-(\d{2})-(\d{2})/i;
const ddmmyyyyRegexp = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d/i;

const parseToDisplayValue = (value) => {
    let result = '';

    if (!utils.isEmpty(value) && isoRegexp.test(value)) {
        const splitedValue = value.split('-');
        result = splitedValue[2] + '.' + splitedValue[1] + '.' + splitedValue[0];
    } else {
        result = value;
    }

    return result;
}

const parseToISO = (value) => {
    const splitedValue = value.split('.');
    return splitedValue[2] + '-' + splitedValue[1] + '-' + splitedValue[0];
}

class DocDateField extends Component {
    render () {
        const { value, placeholder, onChange, onFocus, onBlur } = this.props;
        const displayDateInput = value !== '0';
        const displayZeroField = !displayDateInput;
        const switchText = displayDateInput ? 'нет даты' : 'ввести дату';
        const displayValue = parseToDisplayValue(value);

        return (
            <div>
                { displayDateInput &&
                <MaskedFormControl 
                    type='text' 
                    name='dateField' 
                    mask='11.11.1111' 
                    placeholder={ placeholder } 
                    value={ displayValue }
                    onChange={ this.handleChange }
                    onFocus={ this.handleFocus }
                    onBlur={ this.handleBlur }
                />
                }
                { displayZeroField &&
                <FormControl 
                    type="text"
                    value={ value }
                    onChange={ () => {} }
                    disabled
                />
                }
                <div style={ { position: 'absolute', top: '7px', right: '50px', zIndex: 999 } }>
                    <a onClick={ this.handleSwitch }>{ switchText }</a>
                </div>
            </div>
        );
    }

    handleSwitch = () => {
        const { value, onChange } = this.props;
        value !== '0' ? onChange('0') : onChange('');
    }

    handleChange = (event) => {
        this.handleChangeValue(event, this.props.onChange);
    }

    handleFocus = (event) => {
        this.handleChangeValue(event, this.props.onFocus);
    }

    handleBlur = (event) => {
        this.handleChangeValue(event, this.props.onBlur);
    }

    handleChangeValue = (event, fieldHandler) => {
        const newValue = event.target.value;
        
        if (ddmmyyyyRegexp.test(newValue)) {
            const outDate = parseToISO(newValue);
            fieldHandler(outDate);
        } else {
            fieldHandler(newValue);
        }
    }
}

export default DocDateField;