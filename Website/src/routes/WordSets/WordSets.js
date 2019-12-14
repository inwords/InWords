import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from 'src/components/Card';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import Typography from 'src/components/Typography';
import Button from 'src/components/Button';

function WordSets({ trainingCategories, handleAddingInDictionary }) {
  return (
    <Grid container spacing={3}>
      {trainingCategories.map(({ gameId, title, description, isAvailable }) => (
        <Grid key={gameId} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography as="h2" variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <Button primary onClick={handleAddingInDictionary(gameId)}>
                Добавить в словарь
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

WordSets.propTypes = {
  trainingCategories: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  handleAddingInDictionary: PropTypes.func.isRequired
};

export default WordSets;
