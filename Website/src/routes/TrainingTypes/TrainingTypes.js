import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TrainingsNavigation from 'src/components/TrainingsNavigation';

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

function TrainingTypes() {
  const match = useRouteMatch();

  return (
    <Container component="div" maxWidth="lg">
      <TrainingsNavigation match={match} />
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
                    component={Link}
                    to={
                      match.params.categoryId !== '0'
                        ? `${match.url}/${typeId}`
                        : `${match.url}/${typeId}/0/0`
                    }
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

export default TrainingTypes;
