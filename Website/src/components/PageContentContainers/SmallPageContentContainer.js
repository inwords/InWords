import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const maxWidth = 400;

const styles = theme => ({
    root: {
        [theme.breakpoints.up(maxWidth + theme.spacing.unit * 3 * 2)]: {
            width: maxWidth,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

function SmallPageContentContainer({ children, classes }) {
    return (
        <div className={classes.root}>
            {children}
        </div >
    );
}

SmallPageContentContainer.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallPageContentContainer);
