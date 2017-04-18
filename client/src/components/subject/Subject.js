import React, { Component } from 'react';
import hexRgb from 'hex-rgb';

const getStyle = (color) => {
    const rgb = hexRgb(color);
    return {
        color: color,
        backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.2)'
    }
};

class Subject extends Component {
    render () {
        const { 
            id, name, color, selectable, editable, removable, 
            onClick, onEdit, onSelectChange, onRemove 
        } = this.props;

        return (
            <div className="subject" style={ getStyle(color) } onClick={ onClick.bind(null, id) }>
                <input className={ selectable ? 'subject-select' : 'hidden' }
                    type="checkbox"
                    title="Выбрать"
                    onClick={ onSelectChange }>
                </input>
                <span className="subject-name">{ '#' + name }</span>
                <span className={ editable ? 'subject-edit fa fa-pencil' : 'hidden' }
                    title="Изменить"
                    onClick={ onEdit.bind(null, id) }>
                </span>
                <span className={ removable ? 'subject-remove fa fa-times' : 'hidden' }
                    title="Убрать"
                    onClick={ onRemove }>
                </span>
            </div>
        )
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (this.props.name !== nextProps.name || this.props.color !== nextProps.color) {
            return true;
        }
        return false;
    }
}

Subject.defaultProps = {
    name: '#тэг',
    color: '#00ff00',
    selectable: false,
    editable: false,
    removable: false,
    onClick: () => {},
    onEdit: () => {},
    onSelectChange: () => {}
};

export default Subject;