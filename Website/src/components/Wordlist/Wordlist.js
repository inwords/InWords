import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing.unit,
    }
});

function Wordlist({ wordPairs, classes }) {
    const [checked, setChecked] = useState([0]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <Button variant="contained" color="primary" className={classes.button}>
                Добавить
            </Button>
            <Button variant="contained" color="secondary" className={classes.button}>
                Удалить
            </Button>
            <List className={classes.root}>
                {wordPairs.map(wordPair => (
                    <ListItem key={wordPair.serverId} role={undefined} button onClick={handleToggle(wordPair.serverId)}>
                        <Checkbox checked={checked.indexOf(wordPair.serverId) !== -1} tabIndex={-1} disableRipple />
                        <ListItemText primary={wordPair.wordForeign} secondary={wordPair.wordNative} />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

Wordlist.propTypes = {
    wordPairs: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Wordlist);
