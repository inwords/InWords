import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const trainingTypesInfo = [
  {
    typeId: 0,
    title: 'Карточки',
    description: 'Необходимо открыть правильную пару "Слово-Перевод"'
  }
];

function TrainingTypes({ endpoint = '' }) {
  const match = useRouteMatch();

  return (
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
                      ? `${match.url}/${typeId}${endpoint}`
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
  );
}

TrainingTypes.propTypes = {
  endpoint: PropTypes.string
};

export default TrainingTypes;
