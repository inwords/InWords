import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListItemContainer from 'src/components/core/ListItemContainer';
import ListItem from 'src/components/core/ListItem';
import ListItemText from 'src/components/core/ListItemText';
import ListItemSecondaryAction from 'src/components/core/ListItemSecondaryAction';
import ListItemIcon from 'src/components/core/ListItemIcon';
import ButtonBase from 'src/components/core/ButtonBase';
import Checkbox from 'src/components/core/Checkbox';
import SpeechButton from 'src/components/routes-common/SpeechButton';

import './WordlistItem.scss';

function WordlistItem({
  data: {
    wordPairs,
    checkedValues,
    handleToggle,
    handleOpen,
    editingModeEnabled
  },
  index,
  style
}) {
  const wordPair = wordPairs[index];
  const { serverId, period = 0, onSpeech } = wordPair;
  const acceptablePeriod = period <= 5 ? period : 5;

  return (
    <ListItemContainer style={style}>
      <ListItem
        component={ButtonBase}
        onClick={
          editingModeEnabled ? handleToggle(serverId) : handleOpen(wordPair)
        }
        button
        hasSecondaryAction
        className="wordlist-item"
      >
        <div
          className={classNames('wordlist-item__progress', {
            [`wordlist-item__progress--${acceptablePeriod}`]:
              acceptablePeriod > 0
          })}
        />
        <ListItemIcon>
          <Checkbox
            inputProps={{
              'aria-labelledby': `pair-${serverId}`,
              'data-testid': `pair-${serverId}-checkbox`
            }}
            tabIndex={editingModeEnabled ? -1 : 0}
            checked={checkedValues.includes(serverId)}
            onChange={handleToggle(serverId)}
            onClick={event => {
              event.stopPropagation();
            }}
            edge="start"
          />
        </ListItemIcon>
        <ListItemText
          id={`pair-${wordPair.serverId}`}
          primary={wordPair.wordForeign}
          secondary={wordPair.wordNative}
          className="wordlist-item__text"
        />
      </ListItem>
      <ListItemSecondaryAction>
        <SpeechButton edge="end" onSpeech={onSpeech} />
      </ListItemSecondaryAction>
    </ListItemContainer>
  );
}

WordlistItem.propTypes = {
  data: PropTypes.shape({
    wordPairs: PropTypes.arrayOf(
      PropTypes.shape({
        serverId: PropTypes.number.isRequired,
        wordForeign: PropTypes.string.isRequired,
        wordNative: PropTypes.string.isRequired,
        period: PropTypes.number,
        onSpeech: PropTypes.func.isRequired
      }).isRequired
    ).isRequired,
    checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    editingModeEnabled: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

export default WordlistItem;
