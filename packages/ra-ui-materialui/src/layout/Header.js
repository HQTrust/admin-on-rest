import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import ViewTitle from './ViewTitle';

const styles = (theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
        display: 'flex',
        justifyContent: 'space-between',
    },
    header: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: 24,
        },
    },
});

export const Header = ({
    classes,
    className,
    title,
    actions,
    actionProps,
    ...rest
}) => (
    <div className={classnames(classes.root, className)} {...rest}>
        <ViewTitle className={classes.header} title={title} />
        {actions && React.cloneElement(actions, actionProps)}
    </div>
);

Header.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    title: PropTypes.any,
    actions: PropTypes.element,
    actionProps: PropTypes.object,
};

export default withStyles(styles)(Header);
