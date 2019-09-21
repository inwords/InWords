import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InternalNavigation from 'components/InternalNavigation'

function TrainingsNavigation({
  match: {
    params: { categoryId, trainingId, levelId }
  }
}) {
  return (
    <InternalNavigation>
      {[
        <Link key={0} component={RouterLink} to="/trainings" color="inherit">
          Категории
        </Link>,
        trainingId ? (
          [
            <Link
              key={1}
              component={RouterLink}
              to={`/trainings/${categoryId}`}
              color="inherit"
            >
              Тренажеры
            </Link>,
            levelId ? (
              [
                <Link
                  key={2}
                  component={RouterLink}
                  to={`/trainings/${categoryId}/${trainingId}`}
                  color="inherit"
                >
                  Уровни
                </Link>,
                <Typography key={3} color="textPrimary">
                  Уровень
                </Typography>
              ]
            ) : (
              <Typography key={1} color="textPrimary">
                Уровни
              </Typography>
            )
          ]
        ) : (
          <Typography key={0} color="textPrimary">
            Тренажеры
          </Typography>
        )
      ]}
    </InternalNavigation>
  );
}

TrainingsNavigation.propTypes = {
  match: PropTypes.object.isRequired
};

export default TrainingsNavigation;
