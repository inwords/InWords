import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import withReceivedTrainingCategory from '../HOCs/withReceivedTrainingCategory';
import TrainingNavContainer from 'src/components/TrainingNavContainer';

function TrainingLevels({ trainingId, levelsInfo }) {
  const match = useRouteMatch();

  return (
    <TrainingNavContainer>
      <Grid container spacing={2}>
        {levelsInfo.map(({ levelId, level, playerStars, isAvailable }) => (
          <Grid key={levelId} item xs={6} sm={4} md={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Уровень {level}
                </Typography>
                <div>
                  <StarIcon
                    color={playerStars > 0 ? 'secondary' : 'disabled'}
                  />
                  <StarIcon
                    color={playerStars > 1 ? 'secondary' : 'disabled'}
                  />
                  <StarIcon
                    color={playerStars > 2 ? 'secondary' : 'disabled'}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`${match.url}/${levelId}`}
                  size="small"
                  color="primary"
                  disabled={!isAvailable}
                >
                  Выбрать
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </TrainingNavContainer>
  );
}

TrainingLevels.propTypes = {
  trainingId: PropTypes.number.isRequired,
  levelsInfo: PropTypes.arrayOf(
    PropTypes.exact({
      levelId: PropTypes.number.isRequired,
      level: PropTypes.number.isRequired,
      playerStars: PropTypes.number.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default withReceivedTrainingCategory(TrainingLevels);
