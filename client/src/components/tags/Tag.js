import React from 'react';
import { hexToRGB } from '../../utils/color';

const getStyle = (color) => ({
    color: color,
    backgroundColor: hexToRGB(color, 0.2, true)
});

const Tag = (props) => (
    <div className="tag" style={ getStyle(props.color) }>
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
    removable: false
};

export default Tag;