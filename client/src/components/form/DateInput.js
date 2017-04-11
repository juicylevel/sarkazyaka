import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';
import NumberField from './NumberField';

const fields = {
    day: {
        name: 'day',
        maxLength: 2,
        placeholder: 'ДД',
        style: { 
            maxWidth: '50px' 
        }
    },
    month: {
        name: 'month',
        maxLength: 2,
        placeholder: 'ММ',
        style: { 
            maxWidth: '50px' 
        }
    },
    year: {
        name: 'year',
        maxLength: 4,
        placeholder: 'ГГГГ',
        style: { 
            maxWidth: '60px' 
        }
    }
};

class DateInput extends Component {
    render () {
        return (
            <div className="form-inline">
                <FormControl { ...fields.day } />
                { ' ' }
                <FormControl { ...fields.month } />
                { ' ' }
                <FormControl { ...fields.year } />
            </div>
        )
    }
}

export default DateInput;