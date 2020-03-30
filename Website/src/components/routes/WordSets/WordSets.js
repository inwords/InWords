import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializWordSets } from 'src/actions/wordSetActions';
import { receiveWordSets } from 'src/actions/wordSetApiActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';
import ControlledWordSetPairsAddDialog from './ControlledWordSetPairsAddDialog';

function WordSets() {
  const wordSets = useSelector(store => store.wordSet.sets);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!wordSets.length) {
      (async () => {
        try {
          const data = await dispatch(receiveWordSets());
          dispatch(initializWordSets(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить курсы' }));
        }
      })();
    }
  }, [wordSets.length, dispatch]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {wordSets.map(({ id, title, description }) => (
        <GridItem key={id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-course-${id}`}
                component={Link}
                to={`${match.url}/${id}`}
                variant="text"
                color="primary"
              >
                Пройти
              </LinkButton>
              <Space />
              <IconButton
                data-testid={`to-word-set-${id}`}
                component={Link}
                to={`${match.url}/${id}/word-pairs`}
              >
                <Icon>list</Icon>
              </IconButton>
              <ControlledWordSetPairsAddDialog gameId={id} />
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

export default WordSets;
