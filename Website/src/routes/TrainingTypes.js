import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';
import Card from 'src/components/Card';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import Typography from 'src/components/Typography';
import Link from 'src/components/Link';
import TrainingTypesSettings from 'src/layout/TrainingTypesSettings';
import TrainingCardSection from 'src/layout/TrainingCardSection';
import TrainingSchoolIcon from 'src/layout/TrainingSchoolIcon';

function TrainingTypes({ trainingTypesInfo, level = 0 }) {
  const match = useRouteMatch();
  const params = useParams();

  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

  return (
    <>
      <TrainingTypesSettings />
      <Grid container spacing={3}>
        {trainingTypesInfo.map(({ typeId, title, description }) => {
          return (
            <Grid key={typeId} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography as="h2" variant="h5" gutterBottom>
                    {title}
                  </Typography>
                  <Typography as="p">{description}</Typography>
                  {trainingLevelsMap[level] && (
                    <TrainingCardSection>
                      <TrainingSchoolIcon />
                      <span>
                        На изучение:{' '}
                        {trainingLevelsMap[level].wordTranslations.length}
                      </span>
                    </TrainingCardSection>
                  )}
                </CardContent>
                <CardActions>
                  <Link
                    component={RouterLink}
                    to={
                      params.levelId !== undefined
                        ? `${match.url}/${typeId}`
                        : `${match.url}/${typeId}/${level}`
                    }
                    variant="body1"
                  >
                    Поплыли
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

TrainingTypes.propTypes = {
  level: PropTypes.number.isRequired
};

export default withLocalStorageData(TrainingTypes, ['training-words-quantity']);
