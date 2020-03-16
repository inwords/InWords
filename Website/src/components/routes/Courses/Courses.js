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
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';
import TrainingCategoryWordPairsAddButton from './CourseWordPairsAddButton';

function Courses({ courses }) {
  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {courses.map(({ gameId, title, description }) => (
        <GridItem key={gameId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-course-${gameId}`}
                component={Link}
                to={`${match.url}/${gameId}`}
                variant="text"
                color="primary"
              >
                Пройти
              </LinkButton>
              <Space />
              <IconButton
                component={Link}
                to={`${match.url}/${gameId}/word-set`}
              >
                <Icon>list</Icon>
              </IconButton>
              <TrainingCategoryWordPairsAddButton gameId={gameId} />
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default Courses;
