import React from 'react';
import PropTypes from 'prop-types';

const ViewTitle = ({ className, title }) => (
    <div className={className}>
        {title}
    </div>
);

ViewTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
};

export default ViewTitle;
