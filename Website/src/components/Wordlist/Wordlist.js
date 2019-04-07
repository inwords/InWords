import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { drawerWidth } from '../AppBar/RegularAppBar';
import WordPairAdditionContainer from '../../containers/Wordlist/WordPairAdditionContainer';
import WordPairsDeletionContainer from '../../containers/Wordlist/WordPairsDeletionContainer';
import WordPairEditingContainer from '../../containers/Wordlist/WordPairEditingContainer';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(1100 + drawerWidth + theme.spacing.unit * 3 * 2)]: {
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

function Wordlist({ wordPairs, checked, handleToggle, classes }) {
    return (
        <div className={classes.root}>
            <WordPairAdditionContainer />
            <WordPairsDeletionContainer checked={checked} />
            <List className={classes.list}>
                {wordPairs.map(wordPair => (
                    <ListItem key={wordPair.serverId} role={undefined} button onClick={handleToggle(wordPair.serverId)}>
                        <Checkbox checked={checked.indexOf(wordPair.serverId) !== -1} tabIndex={-1} disableRipple />
                        <ListItemText primary={wordPair.wordForeign} secondary={wordPair.wordNative} />
                        <ListItemSecondaryAction>
                            <WordPairEditingContainer wordPair={wordPair} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

Wordlist.propTypes = {
    wordPairs: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Wordlist);
