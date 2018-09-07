import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import sanitizeRestProps from './sanitizeRestProps';

const TextField = ({ addTitle, className, source, record = {}, ...rest }) => {
    const value = get(record, source)

    return (
        <span
            className={className}
            title={addTitle ? value : undefined}
            {...sanitizeRestProps(rest)}
        >
            {value}
        </span>
    );
};

TextField.propTypes = {
    addLabel: PropTypes.bool,
    addTitle: PropTypes.bool,
    basePath: PropTypes.string,
    cellClassName: PropTypes.string,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

const PureTextField = pure(TextField);

PureTextField.defaultProps = {
    addLabel: true,
    addTitle: false
};

export default PureTextField;
