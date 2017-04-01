import React, { Component } from 'react';

class NumberField extends Component {
    numericRegEx = /^[0-9]\d*$/i;
    numberRegEx = /^\d*\.?\d*$/i;

    constructor (props) {
        super(props);
        this.state = { value: '' };
    }

    render () {
        const { maxLength } = this.props;
        const { value } = this.state;

        return (
            <input 
                type="text" 
                className="form-control" 
                value={ value } 
                onChange={ this.handleChange } 
                maxLength={ maxLength }
            />
        );
    }

    handleChange = (event) => {
        const newValue = event.target.value;
        
        if (newValue === '' || this.checkValue(newValue)) {
            this.setState({ value: newValue });
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