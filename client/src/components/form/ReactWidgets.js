import _ from 'lodash';
import React from 'react';
import { DateTimePicker, DropdownList } from 'react-widgets';
import * as utils from '../../utils';

export const DropdownField = ({ name, onChange, data, valueField, textField, value }) => 
    <DropdownList
        name={ name }
        data={ data }
        valueField={ valueField }
        textField={ textField }
        value={ value }
        onChange={ 
            value => { 
                onChange(_.isObject(value) ? value[valueField] : value); 
            } 
        } 
    />

export const DateTimeField = ({ onChange, value, showTime, placeholder, format = 'DD.MM.YYYY' }) => 
    <DateTimePicker
        placeholder={ placeholder }
        format={ format }
        time={ showTime }
        value={ utils.isEmpty(value) ? null : new Date(value) }
        onChange={ onChange } 
    />