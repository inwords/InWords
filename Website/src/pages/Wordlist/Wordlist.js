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
import WordPairsDeleteAppbar from './WordPairsDeleteAppbar';
import WordPairEditButton from './WordPairEditButton';
import WordPairAddButton from './WordPairAddButton';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function Wordlist({ wordPairs, checked, handleToggle, handleReset }) {
  const classes = useStyles();

  return (
    <Container component="div" maxWidth="md">
      <WordPairsDeleteAppbar checked={checked} handleReset={handleReset} />
      <List className={classes.list}>
        {wordPairs.map(wordPair => {
          const labelId = `checkbox-list-label-${wordPair.serverId}`;

          return (
            <ListItem
              key={wordPair.serverId}
              onClick={handleToggle(wordPair.serverId)}
              button
              dense
            >
              <ListItemIcon>
                <Checkbox
                  inputProps={{ 'aria-labelledby': labelId }}
                  tabIndex={-1}
                  checked={checked.indexOf(wordPair.serverId) !== -1}
                  edge="start"
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={wordPair.wordForeign}
                secondary={wordPair.wordNative}
              />
              <ListItemSecondaryAction>
                <WordPairEditButton
                  wordPair={wordPair}
                  visible={checked.length === 0}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <WordPairAddButton visible={checked.length === 0} />
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
  handleToggle: PropTypes.func.isRequired,
  handleReset: PropTypes.func
};

export default Wordlist;
