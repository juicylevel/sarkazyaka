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
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        }
    };

    render () {
        const { displayColorPicker, color } = this.state;

        return (
            <div style={{ display: 'inline' }}>
                <div className="color-field-sketch" style={ this.sketchColorStyle() } onClick={this.handleClick} />
                { displayColorPicker ? 
                <div style={ popoverStyle }>
                    <div style={ coverStyle } onClick={ this.handleClose } />
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null 
                }
            </div>
        );
    };

    sketchColorStyle = () => {
        const { color } = this.state;
        const rgba = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
        return {
            backgroundColor: rgba
        }
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };
}

export default ColorField;