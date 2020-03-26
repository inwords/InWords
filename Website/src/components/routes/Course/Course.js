import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Icon from 'src/components/core/Icon';
import LinkButton from 'src/components/core/LinkButton';

function Course({ course }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {course.levelsInfo.map(({ levelId, playerStars, isAvailable, level }) => (
        <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={`Уровень ${level}`} />
            <CardContent>
              <div>
                <Icon color={playerStars > 0 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={playerStars > 1 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={playerStars > 2 ? 'gold' : 'disabled'}>star</Icon>
              </div>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-level-${levelId}`}
                component={Link}
                to={`${match.url}/${levelId}/0`}
                disabled={!isAvailable}
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

Course.propTypes = {
  course: PropTypes.shape({
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

export default Course;
