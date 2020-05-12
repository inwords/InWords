import React, { useEffect } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeTrainingHistory } from 'src/actions/trainingActions';
import { getTrainingHistory } from 'src/actions/trainingApiActions';
import Icon from 'src/components/core/Icon';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';

const trainingTypesMap = {
  0: 'Закрытые карточки'
};

function TrainingHistory() {
  const trainingHistory = useSelector(store => store.trainingHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { levels } = await dispatch(getTrainingHistory());
        dispatch(initializeTrainingHistory(levels));
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
      }
    })();
  }, [dispatch]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {trainingHistory.map(({ levelId, stars, gameType }) => (
        <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography component="h2" variant="h6">
                {trainingTypesMap[gameType] || 'Неизвестная тренировка'}
              </Typography>
              <Typography component="p" color="text-secondary" gutterBottom>
                #{levelId}
              </Typography>
              <div>
                <Icon color={stars > 0 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={stars > 1 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={stars > 2 ? 'gold' : 'disabled'}>star</Icon>
              </div>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-level-${levelId}`}
                component={RouterLink}
                to={`${match.url}/${levelId}`}
                variant="text"
                color="primary"
              >
                Выбрать
              </LinkButton>
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

export default TrainingHistory;
