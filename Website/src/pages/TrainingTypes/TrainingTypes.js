import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import BreadcrumbNavigation from 'components/BreadcrumbNavigation';

const trainingTypesInfo = [
  {
    typeId: 0,
    title: 'Игра "Карточки"',
    description: 'Описание появится позже'
  },
  {
    typeId: 1,
    title: 'Выбор правильного перевода',
    description: 'Описание появится позже'
  }
];

function TrainingTypes({ match }) {
  return (
    <Container component="div" maxWidth="lg">
      <BreadcrumbNavigation>
        <Link component={RouterLink} to="/trainings" color="inherit">
          Категории
        </Link>
        <Typography color="textPrimary">Тренажеры</Typography>
      </BreadcrumbNavigation>
      <Grid container spacing={3}>
        {trainingTypesInfo.map(({ typeId, title, description }) => {
          return (
            <Grid key={typeId} item xs={12} sm={6} md={4}>
              <Card>
                <CardHeader title={title} />
                <CardContent>
                  <Typography variant="body2">{description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={RouterLink}
                    to={`${match.url}/${typeId}`}
                    size="small"
                    color="primary"
                  >
                    Выбрать
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

TrainingTypes.propTypes = {
  match: PropTypes.object.isRequired
};

export default TrainingTypes;
