import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import WordlistToolbarContainer from '../../containers/Wordlist/WordlistToolbarContainer';
import WordPairEdit from './WordPairEdit';

const styles = theme => ({
    list: {
        width: '100%',
        marginTop: theme.spacing.unit,
        backgroundColor: theme.palette.background.paper,
    },
});

function Wordlist({ wordPairs, checked, handleToggle, classes }) {
    return (
        <Fragment>
            <WordlistToolbarContainer checked={checked} />
            <List className={classes.list}>
                {wordPairs.map(wordPair => (
                    <ListItem key={wordPair.serverId} role={undefined} button onClick={handleToggle(wordPair.serverId)}>
                        <Checkbox checked={checked.indexOf(wordPair.serverId) !== -1} tabIndex={-1} disableRipple />
                        <ListItemText primary={wordPair.wordForeign} secondary={wordPair.wordNative} />
                        <ListItemSecondaryAction>
                            <WordPairEdit wordPair={wordPair}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    );
}

Wordlist.propTypes = {
    wordPairs: PropTypes.array.isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Wordlist);
