import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import withReceivedGameInfo from './withReceivedGameInfo';

function GameLevels({ levelsInfo }) {
  return (
    <Container component="div" maxWidth="lg">
      <Grid container spacing={3}>
        {levelsInfo.map(levelInfo => (
          <Grid key={levelInfo.levelId} item xs={12} sm={4} md={3}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Уровень {levelInfo.level}
                </Typography>
                <div>
                  <StarIcon
                    color={levelInfo.playerStars > 0 ? 'secondary' : 'disabled'}
                  />
                  <StarIcon
                    color={levelInfo.playerStars > 1 ? 'secondary' : 'disabled'}
                  />
                  <StarIcon
                    color={levelInfo.playerStars > 2 ? 'secondary' : 'disabled'}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/gameLevel/${levelInfo.levelId}`}
                  size="small"
                  color="primary"
                  disabled={!levelInfo.isAvailable}
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

GameLevels.propTypes = {
  levelsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      levelId: PropTypes.number.isRequired,
      level: PropTypes.number.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      playerStars: PropTypes.number.isRequired
    })
  ).isRequired
};

export default withReceivedGameInfo(GameLevels);
