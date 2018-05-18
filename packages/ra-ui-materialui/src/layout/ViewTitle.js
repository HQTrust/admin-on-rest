import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

const ViewTitle = ({ className, title }) => (
    <Typography className={className} variant="headline">
        {title}
    </Typography>
);

ViewTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
};

export default ViewTitle;
