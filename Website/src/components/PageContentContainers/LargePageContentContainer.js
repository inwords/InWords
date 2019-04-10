import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { drawerWidth } from '../AppBar/RegularAppBar';

const maxWidth = 1100;

const styles = theme => ({
    root: {
        [theme.breakpoints.up(maxWidth + drawerWidth + theme.spacing.unit * 3 * 2)]: {
            width: maxWidth,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

function LargePageContentContainer({ children, classes }) {
    return (
        <div className={classes.root}>
            {children}
        </div >
    );
}

LargePageContentContainer.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LargePageContentContainer);
