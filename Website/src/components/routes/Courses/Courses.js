import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';
import CoursesMenuButton from './CoursesMenuButton';

function Courses({ trainingCategories }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {trainingCategories.map(({ gameId, title, description }) => (
        <GridItem key={gameId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader
              title={title}
              action={<CoursesMenuButton gameId={gameId} />}
            />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                component={Link}
                to={`${match.url}/${gameId}`}
                variant="text"
                color="primary"
              >
                Пройти
              </LinkButton>
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

Courses.propTypes = {
  trainingCategories: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default Courses;
