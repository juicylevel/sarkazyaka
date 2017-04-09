import React, { Component } from 'react';

class NumberField extends Component {
    numericRegEx = /^[0-9]\d*$/i;
    numberRegEx = /^\d*\.?\d*$/i;

    render () {
        const { value, placeholder, maxLength, onChange, onFocus, onBlur } = this.props;

        return (
            <input 
                ref={ input => { this.input = input } }
                type="text" 
                className="form-control" 
                placeholder={ placeholder }
                value={ value } 
                onChange={ this.handleChange } 
                onFocus={ onFocus }
                onBlur={ onBlur }
                maxLength={ maxLength }
            />
        );
    }

    handleChange = (event) => {
        const newValue = event.target.value;
        const { onChange } = this.props;

        if (newValue === '' || this.checkValue(newValue)) {
            this.input.value = newValue;
            onChange(event);
        }
    }

    checkValue = (value) => {
        const { number } = this.props;
        const regex = number ? this.numberRegEx : this.numericRegEx;
        return regex.test(value);
    }
}

NumberField.defaultProps = {
    number: false
}

export default NumberField;
