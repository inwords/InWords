import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BreadcrumbNavigation from 'components/BreadcrumbNavigation';
import GameCoreContainer from './GameCoreContainer';

function Game({ children, match }) {
  return (
    <Container component="div" maxWidth="lg">
      <BreadcrumbNavigation>
        <Link component={RouterLink} to="/games" color="inherit">
          Игры
        </Link>
        <Link
          component={RouterLink}
          to={`/games/${match.params.gameId}`}
          color="inherit"
        >
          Уровни
        </Link>
        <Typography color="textPrimary">Уровень</Typography>
      </BreadcrumbNavigation>
      <GameCoreContainer match={match} />
    </Container>
  );
}

Game.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.object.isRequired
};

export default Game;
