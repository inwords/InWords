import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import WordPairEditDialog from './WordPairEditDialog';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function Wordlist({ wordPairs, checked, handleToggle }) {
    const classes = useStyles();

    return (
        <Container component="div" maxWidth="md">
            <List className={classes.list}>
                {wordPairs.map(wordPair => {
                    const labelId = `checkbox-list-label-${wordPair.serverId}`;

                    return (
                        <ListItem
                            key={wordPair.serverId}
                            dense
                            button
                            onClick={handleToggle(wordPair.serverId)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    tabIndex={-1}
                                    checked={checked.indexOf(wordPair.serverId) !== -1}
                                />
                            </ListItemIcon>
                            <ListItemText
                                id={labelId}
                                primary={wordPair.wordForeign}
                                secondary={wordPair.wordNative}
                            />
                            <ListItemSecondaryAction>
                                <WordPairEditDialog wordPair={wordPair} />
                            </ListItemSecondaryAction>
                        </ListItem>);
                })}
            </List>
        </Container>
    );
}

Wordlist.propTypes = {
    wordPairs: PropTypes.arrayOf(
        PropTypes.shape({
            serverId: PropTypes.number.isRequired,
            wordForeign: PropTypes.string.isRequired,
            wordNative: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    checked: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default Wordlist;
