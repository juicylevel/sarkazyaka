import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

class SwitchButton extends Component {
    render () {
        const { value, onChange, onColor, offColor, onText, offText, width } = this.props;
        const valueText = value ? onText : offText;
        const bsStyle = value ? onColor : offColor;
        return (
            <Button style={ { width: width + 'px' } } onClick={ () => onChange(!value) } bsStyle={ bsStyle }>
                { valueText }
            </Button>
        )
    }
}

export default SwitchButton;