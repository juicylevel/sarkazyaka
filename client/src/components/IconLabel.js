import React, { PropTypes } from 'react';

const IconLabel = ({ icon, text }) => (
    <span>
        <span className={ 'fa ' + icon } /> { text }
    </span>
);

IconLabel.propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default IconLabel;