import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BreadcrumbNavigation from 'components/BreadcrumbNavigation';
import Game from './GameContainer';

function GameWrapper({ match }) {
  return (
    <Container component="div" maxWidth="lg">
      <BreadcrumbNavigation>
        <Link component={RouterLink} to="/trainings" color="inherit">
          Категории
        </Link>
        <Link
          component={RouterLink}
          to={`/trainings/${match.params.categoryId}`}
          color="inherit"
        >
          Тренажеры
        </Link>
        <Link
          component={RouterLink}
          to={`/trainings/${match.params.categoryId}/0`}
          color="inherit"
        >
          Уровни
        </Link>
        <Typography color="textPrimary">Уровень</Typography>
      </BreadcrumbNavigation>
      <Game match={match} />
    </Container>
  );
}

GameWrapper.propTypes = {
  match: PropTypes.object.isRequired
};

export default GameWrapper;
