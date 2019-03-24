import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',

        [theme.breakpoints.up('sm')]: {
            width: 576,
        },
        [theme.breakpoints.up('md')]: {
            width: 768,
        },
        [theme.breakpoints.up('lg')]: {
            width: 992,
        },
        [theme.breakpoints.up('xl')]: {
            width: 1200,
        },
    },
});

function PageContainer({ children, classes }) {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
}

PageContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageContainer);
