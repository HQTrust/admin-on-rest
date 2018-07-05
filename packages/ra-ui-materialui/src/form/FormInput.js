import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Labeled from '../input/Labeled';

const sanitizeRestProps = ({ basePath, record, resoure, ...rest }) => rest;

export const FormInput = ({ input, ...rest }) =>
    input ? (
        <div
            className={classnames(
                'ra-input',
                `ra-input-${input.props.source}`,
                input.props.formClassName
            )}
        >
            {input.props.addLabel ? (
                <Labeled {...input.props} {...sanitizeRestProps(rest)}>
                    {React.cloneElement(input, {
                        className: input.props.className,
                        ...sanitizeRestProps(rest),
                    })}
                </Labeled>
            ) : (
                React.cloneElement(input, {
                    className: input.props.className,
                    ...sanitizeRestProps(rest),
                })
            )}
        </div>
    ) : null;

FormInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
};

export default FormInput;
