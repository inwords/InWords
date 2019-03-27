import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    grow: {
        flexGrow: 1,
    },
};

function PageTitle({ title, classes }) {
    return (
        <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
        </Typography>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageTitle);
