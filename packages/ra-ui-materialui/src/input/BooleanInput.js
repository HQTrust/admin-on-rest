import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { addField, FieldTitle } from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

export class BooleanInput extends Component {
    handleChange = (event, value) => {
        this.props.input.onChange(value);
    };

    render() {
        const {
            SwitchClass,
            className,
            input,
            isRequired,
            label,
            options,
            resource,
            source,
            ...rest
        } = this.props;

        return (
            <FormGroup className={className} {...sanitizeRestProps(rest)}>
                <FormControlLabel
                    control={
                        <SwitchClass
                            color="primary"
                            checked={!!input.value}
                            onChange={this.handleChange}
                            {...options}
                        />
                    }
                    label={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                />
            </FormGroup>
        );
    }
}

BooleanInput.propTypes = {
    SwitchClass: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    className: PropTypes.string,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
};

BooleanInput.defaultProps = {
    SwitchClass: Switch,
    options: {},
};

export default addField(BooleanInput);
