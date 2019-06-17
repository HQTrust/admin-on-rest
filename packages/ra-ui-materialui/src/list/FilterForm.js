import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DefaultButton from '@material-ui/core/Checkbox';
import DefaultCheckbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import ActionHide from '@material-ui/icons/HighlightOff';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import classnames from 'classnames';
import lodashSet from 'lodash/set';
import { translate } from 'ra-core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = ({ palette: { primary1Color } }) => ({
    card: {
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
    },
    cardTitle: {},
    checkbox: { height: 24 },
    checkboxCard: {},
    checkboxWrapper: { display: 'flex' },
    formCard: {},
    hiddenFormCard: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    inputContainer: { marginBottom: 8 },
    resetButton: { alignSelf: 'flex-end', margin: 'auto 0 0' },
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
    disableSource,
    dispatch,
    displayedFilters,
    enableSource,
    filterButton,
    filterValues,
    formName,
    handleSubmit,
    hideFilter,
    initialize,
    initialized,
    initialValues,
    invalid,
    location,
    pristine,
    pure,
    reset,
    resetSection,
    save,
    setFilter,
    setFilters,
    setFiltersImmediate,
    setSourceActive,
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
        const { filters, displayedFilters, inActionsToolbar } = this.props;

        let result = filters.filter(
            filterElement =>
                inActionsToolbar === filterElement.props.inActionsToolbar &&
                (filterElement.props.alwaysOn ||
                    displayedFilters[filterElement.props.source])
        );

        // unwrap composite inputs -> will show their multiple children in the grid next to other filters
        result = result.map( filter => filter.props.compositeInput ? React.Children.toArray(filter.props.children) : filter );
        result = _.flatten(result);

        return result;
    }

    handleHide = event =>
        this.props.hideFilter(event.currentTarget.dataset.key);

    onSourceChange = source => event =>
        this.props.setSourceActive(source, event.target.checked);

    render() {
        const {
            ButtonClass,
            buttonProps,
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
            bulkToggleTitle,
            filterTitle,
            ...rest
        } = this.props;

        const shownFilters = this.getShownFilters();
        const isFilterPanelVisible = Object.keys(displayedFilters).length > 0;
        const showFilterPanel =
            !inActionsToolbar &&
            (shouldBulkToggleFilters && isFilterPanelVisible);
        let sourceFilters;
        if (showFilterPanel) {
            sourceFilters = filters.filter(
                filter => metaSources.indexOf(filter.props.source) === -1
            );
        }

        return (
            <div className={className} {...sanitizeRestProps(rest)}>
                {showFilterPanel && (
                    <React.Fragment>
                        <CardContent
                            className={classnames(
                                classes.card,
                                classes.checkboxCard
                            )}
                        >
                            <div className={classes.cardTitle}>
                                {bulkToggleTitle}
                            </div>
                            <Grid container spacing={8}>
                                {sourceFilters.map(sourceFilter => {
                                    const source = sourceFilter.props.source;
                                    return (
                                        <Grid
                                            key={source}
                                            className={classes.checkboxWrapper}
                                            item
                                            sm={12}
                                            lg={6}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <CheckboxClass
                                                        classes={{ root: classes.checkbox }}
                                                        checked={enabledSources[source]}
                                                        onChange={this.onSourceChange(
                                                            source
                                                        )}
                                                    />
                                                }
                                                label={sourceFilter.props.label}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </CardContent>
                        <CardContent
                            className={classnames(classes.card, {
                                [classes.formCard]:
                                    !inActionsToolbar && showFilterPanel,
                                [classes.hiddenFormCard]:
                                    inActionsToolbar || !showFilterPanel,
                            })}
                        >
                            {!inActionsToolbar &&
                                showFilterPanel && (
                                    <div className={classes.cardTitle}>
                                        {filterTitle}
                                    </div>
                                )}

                            <Grid container spacing={16} className={classes.inputContainer}>
                                {shownFilters.map(filterElement => (
                                    <Grid
                                        key={filterElement.props.source}
                                        item
                                        xs={12}
                                        md={6}
                                    >
                                        {filterElement}

                                        {!filterElement.props.alwaysOn &&
                                        !shouldBulkToggleFilters ? (
                                            <IconButton
                                                className="hide-filter"
                                                onClick={this.handleHide}
                                                data-key={
                                                    filterElement.props.source
                                                }
                                                tooltip={translate(
                                                    'ra.action.remove_filter'
                                                )}
                                            >
                                                <ActionHide />
                                            </IconButton>
                                        ) : null}
                                    </Grid>
                                ))}
                            </Grid>

                            <ButtonClass
                                {...buttonProps}
                                className={classes.resetButton}
                                onClick={() => this.props.setFilters({})}
                            >
                                Alles zurücksetzen
                            </ButtonClass>
                        </CardContent>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

FilterForm.propTypes = {
    ButtonClass: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    buttonProps: PropTypes.object,
    CheckboxClass: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    resource: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
    formName: PropTypes.string,
    displayedFilters: PropTypes.object.isRequired,
    hideFilter: PropTypes.func.isRequired,
    inActionsToolbar: PropTypes.bool,
    initialValues: PropTypes.object,
    location: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    shouldBulkToggleFilters: PropTypes.bool,
    disableSource: PropTypes.func,
    enableSource: PropTypes.func,
    enabledSources: PropTypes.object,
    setSourceActive: PropTypes.func,
    bulkToggleTitle: PropTypes.object,
    filterTitle: PropTypes.object,
    metaSources: PropTypes.arrayOf(PropTypes.string),
};

FilterForm.defaultProps = {
    ButtonClass: DefaultButton,
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

export const getFilterFormKey = (resource, location) => `${location.pathname}-${resource}-filter-form`

const mapStateToProps = (state, props) => {
    return {
        form: props.formName || getFilterFormKey(props.resource, props.location)
    }
}

const enhance = compose(
    withStyles(styles),
    translate,
    withProps(mergeInitialValuesWithDefaultValues),
    connect(mapStateToProps, null),
    reduxForm({
        form: 'filterForm',
        enableReinitialize: true,
        destroyOnUnmount: false, // do not destroy to preserve state across navigation
        onChange: (values, dispatch, props) =>
            props && props.setFilters(values),
    })
);

export default enhance(FilterForm);
