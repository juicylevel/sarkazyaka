import React from 'react';
import hexRgb from 'hex-rgb';

const getStyle = (color) => {
    const rgb = hexRgb(color);
    return {
        color: color,
        backgroundColor: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.2)'
    }
};

const Tag = (props) => (
    <div className="tag" style={ getStyle(props.color) } onClick={ props.onClick.bind(null, props.id) }>
        <input className={ props.selectable ? 'tag-select' : 'hidden' }
            type="checkbox"
            title="Выбрать"
            onClick={ props.onSelectChange }>
        </input>
        <span className="tag-name">{ '#' + props.name }</span>
        <span className={ props.editable ? 'tag-edit fa fa-pencil' : 'hidden' }
            title="Изменить"
            onClick={ props.onEdit.bind(null, props.id) }>
        </span>
        <span className={ props.removable ? 'tag-remove fa fa-times' : 'hidden' }
            title="Убрать"
            onClick={ props.onRemove }>
        </span>
    </div>
);

Tag.defaultProps = {
    name: '#тэг',
    color: '#00ff00',
    selectable: false,
    editable: false,
    removable: false,
    onClick: () => {},
    onEdit: () => {}
};

export default Tag;