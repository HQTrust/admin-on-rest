import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FilterForm from './FilterForm';
import FilterButton from './FilterButton';

const styles = {
    button: {},
    form: {},
};

export class Filter extends Component {
    constructor(props) {
        super(props);
    }

    renderButton() {
        const {
            classes = {},
            context,
            debounce,
            resource,
            children,
            showFilter,
            hideActiveFilters,
            showInactiveFilters,
            displayedFilters,
            filterButton,
            filterValues,
            shouldBulkToggleFilters,
        } = this.props;

        return (
            <FilterButton
                button={filterButton}
                className={classes.button}
                resource={resource}
                filters={React.Children.toArray(children)}
                showFilter={showFilter}
                hideActiveFilters={hideActiveFilters}
                showInactiveFilters={showInactiveFilters}
                displayedFilters={displayedFilters}
                filterValues={filterValues}
                shouldBulkToggleFilters={shouldBulkToggleFilters}
            />
        );
    }

    renderForm() {
        const {
            classes = {},
            context,
            debounce,
            resource,
            children,
            hideFilter,
            displayedFilters,
            formClasses,
            inActionsToolbar,
            metaSources,
            showFilter,
            filterValues,
            setFilters,
            shouldBulkToggleFilters,
            setSourceActive,
            ...rest
        } = this.props;

        return (
            <FilterForm
                classes={formClasses}
                className={classes.form}
                resource={resource}
                filters={React.Children.toArray(children)}
                hideFilter={hideFilter}
                displayedFilters={displayedFilters}
                inActionsToolbar={inActionsToolbar}
                initialValues={filterValues}
                setFilters={setFilters}
                shouldBulkToggleFilters={shouldBulkToggleFilters}
                setSourceActive={setSourceActive}
                metaSources={metaSources}
                {...rest}
            />
        );
    }

    render() {
        return this.props.context === 'button'
            ? this.renderButton()
            : this.renderForm();
    }
}

Filter.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    context: PropTypes.oneOf(['form', 'button']),
    debounce: PropTypes.number.isRequired,
    displayedFilters: PropTypes.object,
    filterButton: PropTypes.element,
    filterValues: PropTypes.object,
    formClasses: PropTypes.object,
    hideActiveFilters: PropTypes.func,
    showInactiveFilters: PropTypes.func,
    hideFilter: PropTypes.func,
    inActionsToolbar: PropTypes.bool,
    metaSources: PropTypes.arrayOf(PropTypes.string),
    setFilters: PropTypes.func,
    setSourceActive: PropTypes.func,
    shouldBulkToggleFilters: PropTypes.bool,
    showFilter: PropTypes.func,
    resource: PropTypes.string.isRequired,
};

Filter.defaultProps = {
    debounce: 500,
};

export default withStyles(styles)(Filter);
