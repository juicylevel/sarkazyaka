import React from 'react';
import { DateTimePicker, DropdownList } from 'react-widgets';

export const DropdownField = ({ name, onChange, data, valueField, textField, value }) =>
    <DropdownList
        name={ name }
        data={ data }
        valueField={ valueField }
        textField={ textField }
        value={ value }
        onChange={ onChange } 
    />

export const DateTimeField = ({ onChange, value, showTime }) =>
    <DateTimePicker
        onChange={ onChange }
        format='DD.MM.YYYY'
        time={ showTime }
        value={ !value ? null : new Date(value) }
    />