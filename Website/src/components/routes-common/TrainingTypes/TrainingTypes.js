import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { loadValue, saveValue } from 'src/localStorage';
import useCheckboxList from 'src/components/core/useCheckboxList';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Divider from 'src/components/core/Divider';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import List from 'src/components/core/List';
import ListItemContainer from 'src/components/core/ListItemContainer';
import ListItem from 'src/components/core/ListItem';
import ListItemIcon from 'src/components/core/ListItemIcon';
import ListItemText from 'src/components/core/ListItemText';
import Space from 'src/components/core/Space';
import Checkbox from 'src/components/core/Checkbox';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';
import ButtonBase from 'src/components/core/ButtonBase';
import ControlledTrainingsSettingsDialog from './ControlledTrainingsSettingsDialog';

import './TrainingTypes.scss';

const trainingTypesInfo = [
  {
    typeId: 'openedAudioCards',
    title: 'Открытые аудио-карточки I',
    description:
      'Необходимо правильно закрыть все пары карточек «Озвучка слова – Слово»'
  },
  {
    typeId: 'openedCards',
    title: 'Открытые карточки',
    description:
      'Необходимо правильно закрыть все пары карточек «Слово – Перевод»'
  },
  {
    typeId: 'openedAudioCards2',
    title: 'Открытые аудио-карточки II',
    description:
      'Необходимо правильно закрыть все пары карточек «Озвучка слова – Перевод»'
  },
  {
    typeId: 'closedAudioCards',
    title: 'Закрытые аудио-карточки I',
    description:
      'Необходимо правильно открыть все пары карточек «Озвучка слова – Слово»'
  },
  {
    typeId: 'closedCards',
    title: 'Закрытые карточки',
    description:
      'Необходимо правильно открыть все пары карточек «Слово – Перевод»'
  },
  {
    typeId: 'closedAudioCards2',
    title: 'Закрытые аудио-карточки II',
    description:
      'Необходимо правильно открыть все пары карточек «Озвучка слова – Перевод»'
  }
];

function TrainingTypes({ trainingLevel }) {
  const [trainingTypesPriorityMap, setTrainingTypesPriorityMap] = useState({});

  const match = useRouteMatch();

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  const handleReset = () => {
    setCheckedValues([]);
  };

  const handleCheckAll = () => {
    setCheckedValues([
      ...checkedValues,
      ...trainingTypesInfo
        .filter(({ typeId }) => !checkedValues.includes(typeId))
        .map(({ typeId }) => typeId)
    ]);
  };

  useEffect(() => {
    setCheckedValues(loadValue('selectedTrainingTypes') || []);
  }, [setCheckedValues]);

  useEffect(() => {
    setTrainingTypesPriorityMap(
      checkedValues.reduce((map, value, index) => {
        map[value] = index;
        return map;
      }, {})
    );
    saveValue('selectedTrainingTypes', checkedValues);
  }, [checkedValues]);

  const handleCheckboxClick = event => {
    event.stopPropagation();
  };

  const wordTranslations = trainingLevel.wordTranslations;

  return (
    <Fragment>
      <Paper>
        {wordTranslations && (
          <Toolbar variant="dense" className="training-types-toolbar">
            <Icon color="action" className="training-types-study-icon">
              school
            </Icon>
            <Typography>Слов на изучение: {wordTranslations.length}</Typography>
            <Space />
            <LinkButton
              component={RouterLink}
              to={`${match.url}/=)`}
              disabled={!checkedValues.length || !wordTranslations.length}
              color="primary"
            >
              Начать
            </LinkButton>
          </Toolbar>
        )}
      </Paper>
      <Paper>
        <Toolbar>
          <IconButton
            onClick={handleReset}
            edge="start"
            aria-label="clear selection"
            color="inherit"
          >
            <Icon>close</Icon>
          </IconButton>
          <IconButton
            onClick={handleCheckAll}
            aria-label="check all"
            color="inherit"
          >
            <Icon>done_all</Icon>
          </IconButton>
          <Space x={1} />
          <Typography variant="h6">Тренировки</Typography>
          <Space />
          <ControlledTrainingsSettingsDialog />
        </Toolbar>
        <Divider />
        <List>
          {trainingTypesInfo.map(({ typeId, title, description }) => (
            <ListItemContainer key={typeId}>
              <ListItem
                component={ButtonBase}
                onClick={handleToggle(typeId)}
                button
              >
                <div
                  className="training-types-item-order"
                  style={
                    checkedValues.length &&
                    trainingTypesPriorityMap[typeId] != null
                      ? {
                          left: `calc(${
                            (100 / checkedValues.length) *
                            trainingTypesPriorityMap[typeId]
                          }%)`,
                          width: `calc(100% / ${checkedValues.length})`
                        }
                      : null
                  }
                />
                <ListItemIcon>
                  <Checkbox
                    inputProps={{
                      'aria-labelledby': `training-${typeId}`,
                      'data-testid': `training-${typeId}-checkbox`
                    }}
                    tabIndex={-1}
                    checked={checkedValues.includes(typeId)}
                    onChange={handleToggle(typeId)}
                    onClick={handleCheckboxClick}
                    edge="start"
                  />
                </ListItemIcon>
                <ListItemText
                  id={`training-${typeId}`}
                  primary={title}
                  secondary={description}
                />
              </ListItem>
            </ListItemContainer>
          ))}
        </List>
      </Paper>
    </Fragment>
  );
}

TrainingTypes.propTypes = {
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.array
  }).isRequired
};

export default TrainingTypes;
