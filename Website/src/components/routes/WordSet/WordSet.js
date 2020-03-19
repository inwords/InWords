import React from 'react';
import PropTypes from 'prop-types';
import List from 'src/components/core/List';
import ListItemContainer from 'src/components/core/ListItemContainer';
import ListItem from 'src/components/core/ListItem';
import ListItemText from 'src/components/core/ListItemText';
import ListItemIcon from 'src/components/core/ListItemIcon';
import Checkbox from 'src/components/core/Checkbox';

function WordSet({ wordPairs, checkedValues, handleToggle }) {
  return (
    <List>
      {wordPairs.map(({ serverId, hasAdded, wordForeign, wordNative }) => (
        <ListItemContainer key={serverId}>
          <ListItem
            component="div"
            onClick={!hasAdded ? handleToggle(serverId) : undefined}
            button={!hasAdded}
            hasSecondaryAction
            className="wordlist-item"
          >
            <ListItemIcon>
              <Checkbox
                inputProps={{
                  'aria-labelledby': `pair-${serverId}`,
                  'data-testid': `pair-${serverId}-checkbox`
                }}
                tabIndex={-1}
                checked={hasAdded || checkedValues.includes(serverId)}
                disabled={hasAdded}
                onChange={handleToggle(serverId)}
                onClick={event => {
                  event.stopPropagation();
                }}
                edge="start"
              />
            </ListItemIcon>
            <ListItemText
              id={`pair-${serverId}`}
              primary={wordForeign}
              secondary={wordNative}
            />
          </ListItem>
        </ListItemContainer>
      ))}
    </List>
  );
}

WordSet.propTypes = {
  wordPairs: PropTypes.arrayOf(
    PropTypes.shape({
      serverId: PropTypes.number.isRequired,
      hasAdded: PropTypes.bool.isRequired,
      wordForeign: PropTypes.string.isRequired,
      wordNative: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired
};

export default WordSet;
