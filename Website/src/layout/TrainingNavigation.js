import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InternalNavigation from 'src/layout/InternalNavigation';

const linkTexts = ['Тренировки', 'Уровни', 'Уровень'];

function TrainingNavigation() {
  const { categoryId, trainingId } = useParams();

  const navigationLinks = [];

  if (categoryId) {
    navigationLinks.push(
      <Link key={1} component={RouterLink} to={`/training/${categoryId}`}>
        {linkTexts[0]}
      </Link>
    );
  }

  navigationLinks.push(
    <Link
      key={1}
      component={RouterLink}
      to={`/training/${categoryId}/${trainingId}`}
    >
      {linkTexts[1]}
    </Link>
  );

  navigationLinks.push(
    <Typography key={3} color="textPrimary">
      {linkTexts[2]}
    </Typography>
  );

  return <InternalNavigation>{navigationLinks}</InternalNavigation>;
}

export default React.memo(TrainingNavigation);
