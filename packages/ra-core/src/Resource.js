import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import WithPermissions from './auth/WithPermissions';

import { registerResource, unregisterResource } from './actions';

const componentPropType = PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
]);

export class Resource extends Component {
    componentWillMount() {
        const {
            context,
            name,
            list,
            create,
            edit,
            show,
            options,
            icon,
            registerResource,
        } = this.props;

        if (context === 'registration') {
            const resource = {
                name,
                options,
                hasList: !!list,
                hasEdit: !!edit,
                hasShow: !!show,
                hasCreate: !!create,
                icon,
            };

            registerResource(resource);
        }
    }

    componentWillUnmount() {
        const { context, name, unregisterResource } = this.props;
        if (context === 'registration') {
            unregisterResource(name);
        }
    }

    render() {
        const {
            match,
            context,
            name,
            list,
            create,
            edit,
            show,
            options,
            WrapperComponent,
            wrapperProps,
        } = this.props;

        if (context === 'registration') {
            return null;
        }

        const resource = {
            resource: name,
            options,
            hasList: !!list,
            hasEdit: !!edit,
            hasShow: !!show,
            hasCreate: !!create,
        };

        const router = (
            <Switch>
                {list && (
                    <Route
                        exact
                        path={`${match.url}`}
                        render={routeProps => (
                            <WithPermissions
                                render={props => createElement(list, props)}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}
                {create && (
                    <Route
                        exact
                        path={`${match.url}/create`}
                        render={routeProps => (
                            <WithPermissions
                                render={props => createElement(create, props)}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}
                {edit && (
                    <Route
                        exact
                        path={`${match.url}/:id`}
                        render={routeProps => (
                            <WithPermissions
                                render={props => createElement(edit, props)}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}
                {show && (
                    <Route
                        path={`${match.url}/:id/show`}
                        render={routeProps => (
                            <WithPermissions
                                render={props => createElement(show, props)}
                                {...routeProps}
                                {...resource}
                            />
                        )}
                    />
                )}
            </Switch>
        );

        return WrapperComponent ? (
            <WrapperComponent {...wrapperProps}>
                {router}
            </WrapperComponent>
        ) : router
    }
}

Resource.propTypes = {
    context: PropTypes.oneOf(['route', 'registration']).isRequired,
    match: PropTypes.shape({
        isExact: PropTypes.bool,
        params: PropTypes.object,
        path: PropTypes.string,
        url: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    list: componentPropType,
    create: componentPropType,
    edit: componentPropType,
    show: componentPropType,
    icon: componentPropType,
    options: PropTypes.object,
    registerResource: PropTypes.func.isRequired,
    unregisterResource: PropTypes.func.isRequired,
    WrapperComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    wrapperProps: PropTypes.object,
};

Resource.defaultProps = {
    context: 'route',
    options: {},
};

export default connect(null, { registerResource, unregisterResource })(
    Resource
);
