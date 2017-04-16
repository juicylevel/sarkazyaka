import React from 'react';
import { browserHistory } from 'react-router';

const handleClick = (href) => {
    if (href) {
        browserHistory.push(href);
    }
};

const IconLabel = ({ icon, text, href }) => { 
    const className = icon ? 'fa fa-' + icon : null;
    return (
        <span onClick={ () => handleClick(href) }>
            <span className={ className } /> { text }
        </span>
    )
};

export default IconLabel;