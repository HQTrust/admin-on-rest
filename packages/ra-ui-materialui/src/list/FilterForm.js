import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import DefaultCheckbox from 'material-ui/Checkbox';
import ActionHide from 'material-ui-icons/HighlightOff';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import lodashSet from 'lodash/set';
import { translate } from 'ra-core';
import { FormControlLabel } from 'material-ui/Form';

const styles = ({ palette: { primary1Color } }) => ({
    card: {
        marginTop: '-14px',
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
    },
    body: { display: 'flex', alignItems: 'flex-end' },
    spacer: { width: 48 },
    icon: { color: primary1Color || '#00bcd4', paddingBottom: 0 },
    clearFix: { clear: 'right' },
});

const emptyRecord = {};

const sanitizeRestProps = ({
    anyTouched,
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
    displayedFilters,
    filterValues,
    handleSubmit,
    hideFilter,
    initialize,
    initialized,
    initialValues,
    invalid,
    pristine,
    pure,
    reset,
    resetSection,
    save,
    setFilter,
    setFilters,
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

export class FilterForm extends Component {
    getShownFilters() {
        const {
            filters,
            displayedFilters,
            inActionsToolbar,
            initialValues,
        } = this.props;

        return filters.filter(
            filterElement =>
                inActionsToolbar === filterElement.props.inActionsToolbar &&
                (filterElement.props.alwaysOn ||
                    displayedFilters[filterElement.props.source] ||
                    typeof initialValues[filterElement.props.source] !==
                        'undefined')
        );
    }

    handleHide = event =>
        this.props.hideFilter(event.currentTarget.dataset.key);

    onSourceChange = source => event =>
        this.props.setSourceActive(source, event.target.checked);

    render() {
        const {
            CheckboxClass,
            classes = {},
            className,
            displayedFilters,
            enabledSources,
            filters,
            inActionsToolbar,
            metaSources,
            resource,
            translate,
            shouldBulkToggleFilters,
            ...rest
        } = this.props;

        const shownFilters = this.getShownFilters();
        const isFilterPanelVisible = Object.keys(displayedFilters).length > 0;
        const showSourceCheckboxes =
            !inActionsToolbar &&
            (shouldBulkToggleFilters && isFilterPanelVisible);
        let sources;
        if (showSourceCheckboxes) {
            sources = filters
                .map(filter => filter.props.source)
                .filter(source => metaSources.indexOf(source) === -1);
        }

        return (
            <div className={className} {...sanitizeRestProps(rest)}>
                {showSourceCheckboxes && (
                    <CardContent className={classes.card}>
                        {sources.map(source => (
                            <FormControlLabel
                                key={source}
                                control={
                                    <CheckboxClass
                                        checked={enabledSources[source]}
                                        onChange={this.onSourceChange(source)}
                                    />
                                }
                                label={source}
                            />
                        ))}
                    </CardContent>
                )}
                <CardContent className={classes.card}>
                    {shownFilters.reverse().map(filterElement => (
                        <div
                            key={filterElement.props.source}
                            data-source={filterElement.props.source}
                            className={classnames(
                                'filter-field',
                                classes.body,
                                filterElement.props.containerClassName
                            )}
                        >
                            {filterElement.props.alwaysOn ||
                            shouldBulkToggleFilters ? (
                                <div className={classes.spacer}>&nbsp;</div>
                            ) : (
                                <IconButton
                                    className="hide-filter"
                                    onClick={this.handleHide}
                                    data-key={filterElement.props.source}
                                    tooltip={translate(
                                        'ra.action.remove_filter'
                                    )}
                                >
                                    <ActionHide />
                                </IconButton>
                            )}
                            <div>
                                <Field
                                    allowEmpty
                                    {...filterElement.props}
                                    name={filterElement.props.source}
                                    component={filterElement.type}
                                    resource={resource}
                                    record={emptyRecord}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
                <div className={classes.clearFix} />
            </div>
        );
    }
}

FilterForm.propTypes = {
    CheckboxClass: PropTypes.object,
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    displayedFilters: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    inActionsToolbar: PropTypes.bool,
    initialValues: PropTypes.object,
    translate: PropTypes.func.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    shouldBulkToggleFilters: PropTypes.bool,
    disableSource: PropTypes.func,
    enableSource: PropTypes.func,
    enabledSources: PropTypes.object,
    setSourceActive: PropTypes.func,
    metaSources: PropTypes.arrayOf(PropTypes.string),
};

FilterForm.defaultProps = {
    CheckboxClass: DefaultCheckbox,
};

export const mergeInitialValuesWithDefaultValues = ({
    initialValues,
    filters,
}) => ({
    initialValues: {
        ...filters
            .filter(
                filterElement =>
                    filterElement.props.alwaysOn &&
                    filterElement.props.defaultValue
            )
            .reduce(
                (acc, filterElement) =>
                    lodashSet(
                        { ...acc },
                        filterElement.props.source,
                        filterElement.props.defaultValue
                    ),
                {}
            ),
        ...initialValues,
    },
});

const enhance = compose(
    withStyles(styles),
    translate,
    withProps(mergeInitialValuesWithDefaultValues),
    reduxForm({
        form: 'filterForm',
        enableReinitialize: true,
        destroyOnUnmount: false, // do not destroy to preserve state across navigation
        onChange: (values, dispatch, props) =>
            props && props.setFilters(values),
    })
);

export default enhance(FilterForm);
