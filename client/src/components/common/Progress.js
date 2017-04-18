import React from 'react';

const Progress = ({ text }) => (
    <span>
        <i className="fa fa-refresh fa-spin"></i> { text }
        <span className="sr-only">{ text }</span>
    </span>
);

export default Progress;