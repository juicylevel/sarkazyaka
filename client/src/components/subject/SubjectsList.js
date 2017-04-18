import _ from 'lodash';
import { isEmpty } from '../../utils';
import React from 'react';
import Subject from './Subject';

const renderSubject = (subject, onClick) => (
    <div key={ subject.id }>
        <Subject { ...subject } onClick={ onClick } />
    </div>
);

const SubjectsList = ({ data, onSubjectClick }) => (
    <div>{ data.map(subject => renderSubject(subject, onSubjectClick)) }</div>
)

export default SubjectsList;