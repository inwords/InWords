import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';

function TrainingHistory({ recentTrainings }) {
  return (
    <Grid container spacing={3}>
      {recentTrainings.map(({ levelId, level, playerStars, isAvailable }) => (
        <Grid key={levelId} item xs={6} sm={4} md={3}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Уровень {level}
              </Typography>
              <div>
                <StarIcon color={playerStars > 0 ? 'secondary' : 'disabled'} />
                <StarIcon color={playerStars > 1 ? 'secondary' : 'disabled'} />
                <StarIcon color={playerStars > 2 ? 'secondary' : 'disabled'} />
              </div>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to={`/training/0/0/${levelId}`}
                size="small"
                color="primary"
                disabled={!isAvailable}
              >
                Выбрать
              </Button>
            </CardActions>
          </Card>
        </Grid>
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
