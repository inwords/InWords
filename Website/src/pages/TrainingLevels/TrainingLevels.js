import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import withReceivedTrainingInfo from './withReceivedTrainingInfo';
import TrainingsNavigation from 'components/TrainingsNavigation';

function TrainingLevels({ gameId, levelsInfo, match }) {
  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation match={match} />
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
    </Container>
  );
}

TrainingLevels.propTypes = {
  gameId: PropTypes.number.isRequired,
  levelsInfo: PropTypes.arrayOf(
    PropTypes.exact({
      levelId: PropTypes.number.isRequired,
      level: PropTypes.number.isRequired,
      playerStars: PropTypes.number.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  match: PropTypes.object.isRequired
};

export default withReceivedTrainingInfo(TrainingLevels);
