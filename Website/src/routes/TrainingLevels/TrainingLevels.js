import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import Grid from 'src/components/Grid';
import GridItem from 'src/components/GridItem';
import Card from 'src/components/Card';
import CardHeader from 'src/components/CardHeader';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import Icon from 'src/components/Icon';
import LinkButton from 'src/components/LinkButton';

function TrainingLevels({ trainingCategory }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {trainingCategory.levelsInfo.map(
        ({ levelId, playerStars, isAvailable, level }) => (
          <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardHeader title={`Уровень ${level}`} />
              <CardContent>
                <div>
                  <Icon color={playerStars > 0 ? 'gold' : 'disabled'}>
                    star
                  </Icon>
                  <Icon color={playerStars > 1 ? 'gold' : 'disabled'}>
                    star
                  </Icon>
                  <Icon color={playerStars > 2 ? 'gold' : 'disabled'}>
                    star
                  </Icon>
                </div>
              </CardContent>
              <CardActions>
                <LinkButton
                  component={Link}
                  to={`${match.url}/${levelId}`}
                  disabled={!isAvailable}
                  variant="text"
                  color="primary"
                >
                  Выбрать
                </LinkButton>
              </CardActions>
            </Card>
          </GridItem>
        )
      )}
    </Grid>
  );
}

TrainingLevels.propTypes = {
  trainingCategory: PropTypes.shape({
    levelsInfo: PropTypes.arrayOf(
      PropTypes.shape({
        levelId: PropTypes.number.isRequired,
        playerStars: PropTypes.number.isRequired,
        isAvailable: PropTypes.bool.isRequired,
        level: PropTypes.number.isRequired
      })
    )
  }).isRequired
};

export default TrainingLevels;
