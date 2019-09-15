import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BreadcrumbNavigation from 'components/BreadcrumbNavigation';
import SelectTranslateTraining from './SelectTranslateTrainingContainer';

function SelectTranslateTrainingWrapper({ match }) {
  return (
    <Container component="div" maxWidth="lg">
      <BreadcrumbNavigation>
        <Link component={RouterLink} to="/trainingCategories" color="inherit">
          Категории
        </Link>
        <Link
          component={RouterLink}
          to={`/trainingCategories/${match.params.gameId}`}
          color="inherit"
        >
          Уровни
        </Link>
        <Typography color="textPrimary">Уровень</Typography>
      </BreadcrumbNavigation>
      <SelectTranslateTraining match={match} />
    </Container>
  );
}

SelectTranslateTrainingWrapper.propTypes = {
  match: PropTypes.object.isRequired
};

export default SelectTranslateTrainingWrapper;
