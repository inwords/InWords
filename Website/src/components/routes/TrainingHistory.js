import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeHistory } from 'src/actions/trainingActions';
import { receiveHistory } from 'src/actions/trainingApiActions';
import Icon from 'src/components/core/Icon';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';

function TrainingHistory() {
  const { actual, recentTrainings } = useSelector(
    store => store.training.history
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!actual) {
      (async () => {
        try {
          const data = await dispatch(receiveHistory());
          dispatch(initializeHistory(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
        }
      })();
    }
  }, [actual, dispatch]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {recentTrainings.map(({ levelId, playerStars }) => (
        <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography component="h2" variant="h6">
                Закрытые карточки
              </Typography>
              <Typography component="p" color="text-secondary" gutterBottom>
                #{levelId}
              </Typography>
              <div>
                <Icon color={playerStars > 0 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={playerStars > 1 ? 'gold' : 'disabled'}>star</Icon>
                <Icon color={playerStars > 2 ? 'gold' : 'disabled'}>star</Icon>
              </div>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-training-${levelId}-0`}
                component={RouterLink}
                to={`${match.url}/${levelId}/0`}
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