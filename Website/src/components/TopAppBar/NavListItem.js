import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    item: {
        paddingLeft: theme.spacing.unit * 3,
    },
    selected: {
        fontWeight: '500',
    },
});

function NavListItem({ to, text, selected, classes }) {
    return (
        <ListItem button dense component={Link} to={to} className={classes.item}>
            <ListItemText primary={selected ?
                <Typography color="primary" className={classes.selected}>{text}</Typography> :
                <Typography>{text}</Typography>}
            />
        </ListItem>
    );
}

NavListItem.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
    React.memo(NavListItem)
);
