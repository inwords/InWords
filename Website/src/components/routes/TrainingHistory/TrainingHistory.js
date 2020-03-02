import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import Icon from 'src/components/core/Icon';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import LinkButton from 'src/components/core/LinkButton';

function TrainingHistory({ recentTrainings }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {recentTrainings.map(({ levelId, playerStars }) => (
        <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={`Тренировка ${levelId}`} />
            <CardContent>
              <div>
                <Icon color={playerStars > 0 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={playerStars > 1 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={playerStars > 2 ? 'gold' : 'disabled'}>star</Icon>
              </div>
            </CardContent>
            <CardActions>
              <LinkButton
                component={RouterLink}
                to={`${match.url}/${levelId}/0`}
                variant="text"
                color="primary"
              >
                Выбрать
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
