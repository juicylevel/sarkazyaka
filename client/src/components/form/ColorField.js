import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

const popoverStyle = {
    position: 'absolute',
    zIndex: '2'
};

const coverStyle = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
};

class ColorField extends Component {
    state = {
        displayColorPicker: false
    };

    render () {
        const { value } = this.props;
        const { displayColorPicker } = this.state;
        const fieldStyle = { 
            backgroundColor: value 
        };

        return (
            <div style={ { display: 'inline' } }>
                <div className="color-field-sketch" style={ fieldStyle } onClick={ this.handleClick } />
                { displayColorPicker ? 
                <div style={ popoverStyle }>
                    <div style={ coverStyle } onClick={ this.handleClose } />
                    <SketchPicker color={ value } onChange={ this.handleChange } />
                </div> : null 
                }
            </div>
        );
    }

    handleClick = () => {
        const { displayColorPicker } = this.props;
        this.setState({ displayColorPicker: !displayColorPicker })
    }

    handleChange = (color) => {
        const { onChange } = this.props;
        onChange(color.hex);
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }
}

ColorField.defaultProps = {
    value: '#CC0000'
}

export default ColorField;