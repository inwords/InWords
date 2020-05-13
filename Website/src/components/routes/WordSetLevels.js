import React, { useEffect } from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSetLevels } from 'src/actions/wordSetActions';
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
  const levelsListsMap = useSelector(store => store.wordSet.levelsListsMap);

  const dispatch = useDispatch();

  const { wordSetId: paramWordSetId } = useParams();

  const levels = levelsListsMap[paramWordSetId];

  useEffect(() => {
    if (!levels) {
      (async () => {
        try {
          const data = await dispatch(getWordSetLevels(paramWordSetId));
          dispatch(initializeWordSetLevels(paramWordSetId, data.levels));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
        }
      })();
    }
  }, [levels, dispatch, paramWordSetId]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {Boolean(levels) &&
        levels.map(({ levelId, stars, isAvailable, level }) => (
          <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardHeader title={`Уровень ${level}`} />
              <CardContent>
                <div>
                  {Array.apply(null, Array(parseInt(stars / 2))).map(
                    (_, index) => (
                      <Icon key={index} color="gold">
                        star
                      </Icon>
                    )
                  )}
                  {stars % 2 !== 0 && <Icon color="gold">star_half</Icon>}
                  {Array.apply(null, Array(parseInt((6 - stars) / 2))).map(
                    (_, index) => (
                      <Icon key={index} color="gold">
                        star_border
                      </Icon>
                    )
                  )}
                </div>
              </CardContent>
              <CardActions>
                <LinkButton
                  data-testid={`to-level-${levelId}`}
                  component={Link}
                  to={`${match.url}/${levelId}/=)`}
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
