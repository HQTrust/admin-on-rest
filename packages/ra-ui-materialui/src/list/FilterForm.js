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
    checkboxCard: {},
    formCard: {},
    hiddenFormCard: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    inputContainer: { marginBottom: 24 },
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

        return filters.filter(
            filterElement =>
                inActionsToolbar === filterElement.props.inActionsToolbar &&
                (filterElement.props.alwaysOn ||
                    displayedFilters[filterElement.props.source])
        );
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
                            {sourceFilters.map(sourceFilter => {
                                const source = sourceFilter.props.source;
                                return (
                                    <FormControlLabel
                                        key={source}
                                        control={
                                            <CheckboxClass
                                                checked={enabledSources[source]}
                                                onChange={this.onSourceChange(
                                                    source
                                                )}
                                            />
                                        }
                                        label={sourceFilter.props.label}
                                    />
                                );
                            })}
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
                                        sm={6}
                                        md={4}
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
                                Allex zurücksetzen
                            </ButtonClass>
                        </CardContent>
                    </React.Fragment>
                )}
                <div className={classes.clearFix} />
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
