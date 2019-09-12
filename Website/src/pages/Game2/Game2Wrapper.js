import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BreadcrumbNavigation from 'components/BreadcrumbNavigation';
import Game2 from './Game2Container';

function Game2Wrapper({ match }) {
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
      <Game2 match={match} />
    </Container>
  );
}

Game2Wrapper.propTypes = {
  match: PropTypes.object.isRequired
};

export default Game2Wrapper;
