import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import WordPairEditButton from './WordPairEditButton';

function WordPairRow({
  index,
  data: { wordPairs, checkedValues, handleToggle, handleReset },
  style
}) {
  const { serverId, wordForeign, wordNative } = wordPairs[index];
  const labelId = `checkbox-list-label-${serverId}`;

  return (
    <ListItem
      key={index}
      onClick={handleToggle(serverId)}
      ContainerProps={{ style }}
      button
      dense
    >
      <ListItemIcon>
        <Checkbox
          inputProps={{ 'aria-labelledby': labelId }}
          tabIndex={-1}
          checked={checkedValues.includes(serverId)}
          edge="start"
          disableRipple
        />
      </ListItemIcon>
      <ListItemText
        id={labelId}
        primary={wordForeign || '-'}
        secondary={wordNative || '-'}
      />
      <ListItemSecondaryAction>
        <WordPairEditButton
          wordPair={wordPairs[index]}
          handleReset={handleReset}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

WordPairRow.propTypes = {
  data: PropTypes.exact({
    wordPairs: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired
  }).isRequired,
  style: PropTypes.object.isRequired
};

export default WordPairRow;
