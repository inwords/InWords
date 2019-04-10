import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import WordPairAdditionButtonContainer from '../../containers/Wordlist/WordPairAdditionButtonContainer';
import WordPairsDeletionButtonContainer from '../../containers/Wordlist/WordPairsDeletionButtonContainer';
import WordPairEditingButtonContainer from '../../containers/Wordlist/WordPairEditingButtonContainer';
import LargePageContentContainer from '../PageContentContainers/LargePageContentContainer';

const styles = theme => ({
    list: {
        width: '100%',
        marginTop: theme.spacing.unit,
        backgroundColor: theme.palette.background.paper,
    },
});

function Wordlist({ wordPairs, checked, handleToggle, classes }) {
    return (
        <LargePageContentContainer>
            <WordPairsDeletionButtonContainer checked={checked} />
            <List className={classes.list}>
                {wordPairs.map(wordPair => (
                    <ListItem key={wordPair.serverId} button onClick={handleToggle(wordPair.serverId)}>
                        <Checkbox checked={checked.indexOf(wordPair.serverId) !== -1} tabIndex={-1} disableRipple />
                        <ListItemText primary={wordPair.wordForeign} secondary={wordPair.wordNative} />
                        <ListItemSecondaryAction>
                            <WordPairEditingButtonContainer wordPair={wordPair} />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <WordPairAdditionButtonContainer />
        </LargePageContentContainer>
    );
}

Wordlist.propTypes = {
    wordPairs: PropTypes.arrayOf(
        PropTypes.shape({
            serverId: PropTypes.number.isRequired,
            wordForeign: PropTypes.string.isRequired,
            wordNative: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wordlist);
