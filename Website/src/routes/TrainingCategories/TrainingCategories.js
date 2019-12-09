import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CategoryMenuButton from './CategoryMenuButton';

function TrainingCategories({ trainingCategories }) {
  return (
    <Grid container spacing={3}>
      {trainingCategories.map(({ gameId, title, description, isAvailable }) => (
        <Grid key={gameId} item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader
              title={title}
              action={<CategoryMenuButton categoryId={gameId} />}
            />
            <CardContent>
              <Typography variant="body2">{description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

TrainingCategories.propTypes = {
  trainingCategories: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
};

export default TrainingCategories;
