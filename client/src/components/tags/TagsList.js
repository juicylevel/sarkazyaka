import _ from 'lodash';
import React from 'react';
import Tag from './Tag';

const renderTag = (tag, onEdit) => (
    <div key={ tag.id }>
        <Tag { ...tag } editable={ true } onEdit={ onEdit } />
    </div>
);

const TagsList = ({ tags, onEdit }) => (
    <div>
        { !_.isEmpty(tags) ? tags.map(tag => renderTag(tag, onEdit)) : <p>ни одной темы пока не создано...</p> }
    </div>
);

export default TagsList;