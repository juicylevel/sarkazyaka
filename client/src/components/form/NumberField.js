import React, { Component } from 'react';

class NumberField extends Component {
    numericRegEx = /^[0-9]\d*$/i;
    numberRegEx = /^\d*\.?\d*$/i;

    constructor (props) {
        super(props);
        this.state = { value: '' };
    }

    render () {
        const { maxLength, onChange, onFocus, onBlur } = this.props;
        const { value } = this.state;

        return (
            <input 
                type="text" 
                className="form-control" 
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
            this.setState({ value: newValue });
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