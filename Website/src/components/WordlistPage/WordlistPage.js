import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ContentContainer from '../ContentContainer';
import WordPairEditButtonWithDialog from './WordPairEditButtonWithDialog';
import WordPairAddButtonWithDialog from './WordPairAddButtonWithDialog';

const styles = theme => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

function WordlistPage({ wordPairs, checked, handleToggle, classes }) {
    return (
        <ContentContainer size="md">
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
            <WordPairAddButtonWithDialog visible={checked.length === 0} />
        </ContentContainer>
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
