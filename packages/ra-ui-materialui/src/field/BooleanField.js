import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import MuiFalseIcon from '@material-ui/icons/Clear';
import MuiTrueIcon from '@material-ui/icons/Done';

import sanitizeRestProps from './sanitizeRestProps';

export const BooleanField = ({
    className,
    source,
    record,
    FalseIcon,
    TrueIcon,
    falseIconProps,
    trueIconProps,
    ...rest
}) => {
    if (get(record, source) === false) {
        return (
            <span className={className} {...sanitizeRestProps(rest)}>
                <FalseIconClass {...falseIconProps} />
            </span>
        );
    }

    if (get(record, source) === true) {
        return (
            <span className={className} {...sanitizeRestProps(rest)}>
                <TrueIcon {..trueIconProps} />
            </span>
        );
    }

    return (
        <span className={className} {...sanitizeRestProps(rest)} />
    );
};

BooleanField.propTypes = {
    FalseIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    TrueIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    cellClassName: PropTypes.string,
    className: PropTypes.string,
    falseIconProps: PropTypes.object,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    trueIconProps: PropTypes.object,
};

const PureBooleanField = pure(BooleanField);

PureBooleanField.defaultProps = {
    FalseIcon: MuiFalseIcon,
    TrueIcon: MuiTrueIcon,
    addLabel: true,
};

export default PureBooleanField;
