import React from 'react';
import { Button } from 'react-bootstrap';
import Progress from './Progress';
import IconLabel from './IconLabel';

const BusyButton = ({ id, bsStyle, disabled, busy, visible, text, title, type, icon, progressText, onClick }) => {
    const btnStyle = { 
        display: visible ? 'inline-block' : 'none' 
    }; 
    return (
        <Button id={ id } type={ type } title={ title } bsStyle={ bsStyle } style={ btnStyle } disabled={ disabled } onClick={ onClick }>
            { busy ? <Progress text={ progressText } /> : <IconLabel icon={ icon } text={ text } /> }
        </Button>
    )
}  

BusyButton.defaultProps = {
    type: 'button',
    bsStyle: 'default',
    visible: true,
    disabled: false,
    busy: false,
    text: 'Кнопка',
    icon: 'star',
    progressText: 'Подождите...'
}

export default BusyButton;