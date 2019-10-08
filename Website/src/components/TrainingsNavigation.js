import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InternalNavigation from 'components/InternalNavigation';

function TrainingsNavigation({
  match: {
    params: { categoryId, trainingId, levelId }
  }
}) {
  if (categoryId === '0') {
    return null;
  }

  return (
    <InternalNavigation>
      {categoryId ? (
        [
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
                <Typography key={2} color="textPrimary">
                  Уровни
                </Typography>
              )
            ]
          ) : (
            <Typography key={1} color="textPrimary">
              Тренажеры
            </Typography>
          )
        ]
      ) : (
        <Typography key={0} color="textPrimary">
          Категории
        </Typography>
      )}
    </InternalNavigation>
  );
}

TrainingsNavigation.propTypes = {
  match: PropTypes.object.isRequired
};

export default memo(withRouter(TrainingsNavigation));
