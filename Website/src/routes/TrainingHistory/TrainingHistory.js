import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import Grid from 'src/components/Grid';
import GridItem from 'src/components/GridItem';
import Card from 'src/components/Card';
import CardHeader from 'src/components/CardHeader';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import LinkButton from 'src/components/LinkButton';
import StarIcon from '@material-ui/icons/Star';

function TrainingHistory({ recentTrainings }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {recentTrainings.map(({ levelId, playerStars }) => (
        <GridItem key={levelId} xs={6} sm={4} md={3}>
          <Card>
            <CardHeader title={`Тренировка ${levelId}`} />
            <CardContent>
              <div>
                <StarIcon color={playerStars > 0 ? 'secondary' : 'disabled'} />
                <StarIcon color={playerStars > 1 ? 'secondary' : 'disabled'} />
                <StarIcon color={playerStars > 2 ? 'secondary' : 'disabled'} />
              </div>
            </CardContent>
            <CardActions>
              <LinkButton
                component={RouterLink}
                to={`${match.url}/${levelId}/0`}
                variant="text"
                color="primary"
              >
                Поплыли
              </LinkButton>
            </CardActions>
          </Card>
        </GridItem>
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
