import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = ({
    root: {
        flexGrow: 1,
    },
});

function Register({ classes }) {
    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
}

Register.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
