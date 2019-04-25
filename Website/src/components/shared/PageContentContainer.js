import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(1100 + 240 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

function PageContentContainer({ children, classes }) {
    return (
        <div className={classes.root}>
            {children}
        </div>
    );
}

PageContentContainer.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageContentContainer);
