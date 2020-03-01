import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import Button from 'src/components/core/Button';
import WordSetsMenuButton from './WordSetsMenuButton';

function WordSets({ trainingCategories, handleAddingInDictionary }) {
  return (
    <Grid spacing={3}>
      {trainingCategories.map(({ gameId, title, description }) => (
        <GridItem key={gameId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader
              title={title}
              action={<WordSetsMenuButton gameId={gameId} />}
            />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={handleAddingInDictionary(gameId)}
                variant="text"
                color="primary"
              >
                Добавить в словарь
              </Button>
            </CardActions>
          </Card>
        </GridItem>
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
