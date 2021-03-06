import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { getDefaultValues, translate } from 'ra-core';
import FormInput from './FormInput';
import Toolbar from './Toolbar';

const sanitizeRestProps = ({
    anyTouched,
    array,
    asyncValidate,
    asyncValidating,
    autofill,
    blur,
    change,
    clearAsyncError,
    clearFields,
    clearSubmit,
    clearSubmitErrors,
    destroy,
    dirty,
    dispatch,
    form,
    formName,
    handleSubmit,
    initialValues,
    initialize,
    initialized,
    pristine,
    pure,
    redirect,
    reset,
    resetSection,
    save,
    submit,
    submitFailed,
    submitSucceeded,
    submitting,
    touch,
    translate,
    triggerSubmit,
    untouch,
    valid,
    validate,
    ...props
}) => props;

export class SimpleForm extends Component {
    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
        this.props.handleSubmit(values => this.props.save(values, redirect));

    render() {
        const {
            basePath,
            children,
            className,
            classes = {},
            formName,
            invalid,
            pristine,
            record,
            resource,
            submitOnEnter,
            toolbar,
            toolbarPosition,
            version,
            ...rest
        } = this.props;

        return (
            <form
                className={classnames('simple-form', className)}
                {...sanitizeRestProps(rest)}
            >
                {toolbar &&
                    toolbarPosition === 'top' &&
                    React.cloneElement(toolbar, {
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        invalid,
                        pristine,
                        submitOnEnter,
                    })}
                <div className={classes.form} key={version}>
                    {Children.map(children, input => (
                        <FormInput
                            basePath={basePath}
                            input={input}
                            record={record}
                            resource={resource}
                        />
                    ))}
                </div>
                {toolbar &&
                    toolbarPosition === 'bottom' &&
                    React.cloneElement(toolbar, {
                        handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                        invalid,
                        pristine,
                        submitOnEnter,
                    })}
            </form>
        );
    }
}

SimpleForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    formName: PropTypes.string,
    handleSubmit: PropTypes.func, // passed by redux-form
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resource: PropTypes.string,
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    submitOnEnter: PropTypes.bool,
    toolbar: PropTypes.element,
    toolbarPosition: PropTypes.oneOf(['bottom', 'top']),
    validate: PropTypes.func,
    version: PropTypes.number,
};

SimpleForm.defaultProps = {
    submitOnEnter: true,
    toolbar: <Toolbar />,
    toolbarPosition: 'bottom',
};

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
        form: props.formName || 'record-form'
    })),
    translate, // Must be before reduxForm so that it can be used in validation
    reduxForm({
        destroyOnUnmount: false,
        enableReinitialize: true,
    })
);

export default enhance(SimpleForm);
