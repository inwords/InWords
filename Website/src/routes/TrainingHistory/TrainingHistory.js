import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from 'src/components/Card';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import CardTitle from 'src/components/CardTitle';
import CardAction from 'src/components/CardAction';
import StarIcon from '@material-ui/icons/Star';

function TrainingHistory({ recentTrainings }) {
  const match = useRouteMatch();

  return (
    <Grid container spacing={3}>
      {recentTrainings.map(({ levelId, level, playerStars }) => (
        <Grid key={levelId} item xs={6} sm={4} md={3}>
          <Card>
            <CardContent>
              <CardTitle>Уровень {levelId}</CardTitle>
              <div>
                <StarIcon color={playerStars > 0 ? 'secondary' : 'disabled'} />
                <StarIcon color={playerStars > 1 ? 'secondary' : 'disabled'} />
                <StarIcon color={playerStars > 2 ? 'secondary' : 'disabled'} />
              </div>
            </CardContent>
            <CardActions>
              <CardAction as={RouterLink} to={`${match.url}/${levelId}`}>
                Выбрать
              </CardAction>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

TrainingHistory.propTypes = {
  recentTrainings: PropTypes.arrayOf(
    PropTypes.shape({
      levelId: PropTypes.number.isRequired,
      playerStars: PropTypes.number.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      level: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default TrainingHistory;
