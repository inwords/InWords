import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InvertedDynamicAppBar from 'src/components/InvertedDynamicAppBar';
import InternalNavigation from 'src/components/InternalNavigation';

function TrainingsNavigation({
  match: {
    params: { categoryId, trainingId, levelId }
  }
}) {
  const navigation = (
    <InternalNavigation>
      {categoryId ? (
        [
          categoryId !== '0' && (
            <Link
              key={0}
              component={RouterLink}
              to="/trainings"
              color="inherit"
            >
              Категории
            </Link>
          ),
          trainingId ? (
            [
              <Link
                key={1}
                component={RouterLink}
                to={`/trainings/${categoryId}`}
                color="inherit"
              >
                Тренировки
              </Link>,
              levelId ? (
                [
                  categoryId !== '0' && (
                    <Link
                      key={2}
                      component={RouterLink}
                      to={`/trainings/${categoryId}/${trainingId}`}
                      color="inherit"
                    >
                      Уровни
                    </Link>
                  ),
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
              Тренировки
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

  return (
    <>
      <InvertedDynamicAppBar>{navigation}</InvertedDynamicAppBar>
      {navigation}
    </>
  );
}

TrainingsNavigation.propTypes = {
  match: PropTypes.object.isRequired
};

export default memo(withRouter(TrainingsNavigation));
