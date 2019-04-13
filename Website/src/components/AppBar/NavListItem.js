import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
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

function NavListItem({to, text, location, classes}) {
    return (
        <ListItem button dense component={Link} to={to} className={classes.item}>
            <ListItemText primary={location.pathname.startsWith(to) ?
                <Typography color="primary" className={classes.weightedText}>{text}</Typography> :
                <Typography>{text}</Typography>}
            />
        </ListItem>
    );
}

NavListItem.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
    withRouter(NavListItem)
);
