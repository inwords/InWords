import React, { Fragment } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InternalNavigation from 'src/components/InternalNavigation';

const linkTexts = ['Курсы', 'Тренировки', 'Уровни', 'Уровень'];

function TrainingNavigation() {
  const { categoryId, trainingId, levelId } = useParams();

  const navigationLinks = [];

  if (categoryId) {
    if (categoryId !== '0') {
      navigationLinks.push(
        <Link
          key={0}
          component={RouterLink}
          to="/training/main"
          color="inherit"
        >
          {linkTexts[0]}
        </Link>
      );
    }

    if (trainingId) {
      navigationLinks.push(
        <Link
          key={1}
          component={RouterLink}
          to={`/training/${categoryId}`}
          color="inherit"
        >
          {linkTexts[1]}
        </Link>
      );

      if (levelId) {
        if (categoryId !== '0') {
          navigationLinks.push(
            <Link
              key={2}
              component={RouterLink}
              to={`/training/${categoryId}/${trainingId}`}
              color="inherit"
            >
              {linkTexts[2]}
            </Link>
          );
        }

        navigationLinks.push(
          <Typography key={3} color="textPrimary">
            {linkTexts[3]}
          </Typography>
        );
      } else {
        navigationLinks.push(
          <Typography key={2} color="textPrimary">
            {linkTexts[2]}
          </Typography>
        );
      }
    } else {
      navigationLinks.push(
        <Typography key={1} color="textPrimary">
          {linkTexts[1]}
        </Typography>
      );
    }
  } else {
    navigationLinks.push(
      <Typography key={0} color="textPrimary">
        {linkTexts[0]}
      </Typography>
    );
  }

  const navigation = <InternalNavigation>{navigationLinks}</InternalNavigation>;

  return <Fragment>{navigation}</Fragment>;
}

export default React.memo(TrainingNavigation);
