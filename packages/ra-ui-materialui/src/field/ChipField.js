import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';

const styles = {
    chip: { margin: 4 },
};

export const ChipField = ({
    ChipClass,
    className,
    classes = {},
    source,
    record = {},
    ...rest
}) => {
    return (
        <ChipClass
            className={classnames(classes.chip, className)}
            label={get(record, source)}
            {...sanitizeRestProps(rest)}
        />
    );
};

ChipField.propTypes = {
    ChipClass: PropTypes.func.isRequired,
    className: PropTypes.string,
    classes: PropTypes.object,
    elStyle: PropTypes.object,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

ChipField.defaultProps = {
    ChipClass: Chip,
};

const PureChipField = withStyles(styles)(pure(ChipField));

export default PureChipField;
