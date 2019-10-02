import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TrainingsNavigation from 'components/TrainingsNavigation';

function TrainingCategories({ gamesInfo, match }) {
  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation match={match} />
      <Grid container spacing={3}>
        {gamesInfo.map(({ gameId, title, description, isAvailable }) => (
          <Grid key={gameId} item xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title={title} />
              <CardContent>
                <Typography variant="body2">{description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`${match.url}/${gameId}`}
                  disabled={!isAvailable}
                  size="small"
                  color="primary"
                >
                  Выбрать
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

TrainingCategories.propTypes = {
  gamesInfo: PropTypes.arrayOf(
    PropTypes.shape({
      gameId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  match: PropTypes.object.isRequired
};

export default TrainingCategories;
