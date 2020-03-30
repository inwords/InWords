import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSetLevelsList } from 'src/actions/wordSetActions';
import { getWordSetLevels } from 'src/actions/wordSetApiActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Icon from 'src/components/core/Icon';
import LinkButton from 'src/components/core/LinkButton';

function WordSetLevels() {
  const setLevelsListsMap = useSelector(
    store => store.wordSet.setLevelsListsMap
  );

  const dispatch = useDispatch();

  const params = useParams();
  const wordSetId = params.wordSetId;

  const setLevels = setLevelsListsMap[wordSetId];

  React.useEffect(() => {
    if (!setLevels) {
      (async () => {
        try {
          const data = await dispatch(getWordSetLevels(wordSetId));
          dispatch(initializeWordSetLevelsList(wordSetId, data.levels));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
        }
      })();
    }
  }, [setLevels, dispatch, wordSetId]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {Boolean(setLevels) &&
        setLevels.map(({ levelId, stars, isAvailable, level }) => (
          <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardHeader title={`Уровень ${level}`} />
              <CardContent>
                <div>
                  <Icon color={stars > 0 ? 'gold' : 'disabled'}>star</Icon>
                  <Icon color={stars > 1 ? 'gold' : 'disabled'}>star</Icon>
                  <Icon color={stars > 2 ? 'gold' : 'disabled'}>star</Icon>
                </div>
              </CardContent>
              <CardActions>
                <LinkButton
                  data-testid={`to-level-${levelId}`}
                  component={Link}
                  to={`${match.url}/${levelId}/0`}
                  disabled={!isAvailable}
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

export default WordSetLevels;
