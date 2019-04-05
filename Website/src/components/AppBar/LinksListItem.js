import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    item: {
        paddingLeft: theme.spacing.unit * 3,
    },
    weightedText: {
        fontWeight: '500',
    },
});

function LinksListItem({ to, text, classes, location }) {
    return (
        <ListItem button dense component={Link} to={to} className={classes.item}>
            <ListItemText primary={
                <Typography className={
                    location.pathname === to ? classes.weightedText : null}>{text}</Typography>} />
        </ListItem>
    );
};

LinksListItem.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(LinksListItem));
