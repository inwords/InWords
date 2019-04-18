import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import WordPairEditButtonWithDialog from './WordPairEditButtonWithDialog';
import WordPairAddButtonWithDialog from './WordPairAddButtonWithDialog';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(1100 + 240 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    list: {
        width: '100%',
        marginTop: theme.spacing.unit,
        backgroundColor: theme.palette.background.paper,
    },
});

function WordlistPage({ wordPairs, checked, handleToggle, classes }) {
    return (
        <div className={classes.root}>
            <List className={classes.list}>
                {wordPairs.map(wordPair => (
                    <ListItem key={wordPair.serverId} button onClick={handleToggle(wordPair.serverId)}>
                        <Checkbox checked={checked.indexOf(wordPair.serverId) !== -1} tabIndex={-1} disableRipple />
                        <ListItemText primary={wordPair.wordForeign} secondary={wordPair.wordNative} />
                        <ListItemSecondaryAction>
                            <WordPairEditButtonWithDialog wordPair={wordPair} />
                        </ListItemSecondaryAction>
                    </ListItem>))}
            </List>
            <WordPairAddButtonWithDialog />
        </div>
    );
}

WordlistPage.propTypes = {
    wordPairs: PropTypes.arrayOf(
        PropTypes.shape({
            serverId: PropTypes.number.isRequired,
            wordForeign: PropTypes.string.isRequired,
            wordNative: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WordlistPage);
