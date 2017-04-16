import _ from 'lodash';
import React from 'react';
import Tag from './Tag';

const renderTag = (tag, onClick) => (
    <div key={ tag.id }>
        <Tag { ...tag } onClick={ onClick } />
    </div>
);

const TagsList = ({ tags, onSubjectClick }) => (
    <div>
        { !_.isEmpty(tags) ? tags.map(tag => renderTag(tag, onSubjectClick)) : <p>ни одной темы пока не создано...</p> }
    </div>
);

export default TagsList;