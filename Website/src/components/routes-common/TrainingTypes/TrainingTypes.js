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
import ControlledTrainingsSettingsDialog from './ControlledTrainingsSettingsDialog';

import './TrainingTypes.scss';

const trainingTypesInfo = [
  {
    typeId: 1,
    title: 'Аудирование',
    description:
      'Необходимо правильно выбрать английское слово по его произношению'
  },
  {
    typeId: 0,
    title: 'Закрытые карточки',
    description: 'Необходимо правильно открыть пару карточек «Слово-Перевод»'
  }
];

function TrainingTypes({ trainingLevel }) {
  const match = useRouteMatch();

  const wordTranslations = trainingLevel.wordTranslations;

  const { checkedValues, setCheckedValues, handleToggle } = useCheckboxList();

  const handleReset = () => {
    setCheckedValues([]);
  };

  const handleCheckAll = () => {
    setCheckedValues(trainingTypesInfo.map(({ typeId }) => typeId));
  };

  useEffect(() => {
    setCheckedValues(loadValue('selectedTrainingTypes') || []);
  }, [setCheckedValues]);

  useEffect(() => {
    saveValue('selectedTrainingTypes', checkedValues);
  }, [checkedValues]);

  return (
    <Fragment>
      <Paper>
        {wordTranslations && (
          <Toolbar variant="dense" className="training-types-toolbar">
            <Icon color="action" className="training-types-study-icon">
              school
            </Icon>
            <Typography variant="body1">
              Слов на изучение: {wordTranslations.length}
            </Typography>
            <Space />
            <LinkButton
              component={RouterLink}
              to={`${match.url}/0`}
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
                component="div"
                onClick={handleToggle(typeId)}
                button
                hasSecondaryAction
              >
                <ListItemIcon>
                  <Checkbox
                    inputProps={{
                      'aria-labelledby': `training-${typeId}`,
                      'data-testid': `training-${typeId}-checkbox`
                    }}
                    tabIndex={-1}
                    checked={checkedValues.includes(typeId)}
                    onChange={handleToggle(typeId)}
                    onClick={event => {
                      event.stopPropagation();
                    }}
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
