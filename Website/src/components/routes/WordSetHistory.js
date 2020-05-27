import React, { useEffect } from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSetHistory } from 'src/actions/wordSetActions';
import { getWordSetHistory } from 'src/actions/wordSetApiActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';

const pickRightWord = n => {
  const lastDigit = n % 10;
  return `слов${
    lastDigit > 4 || lastDigit === 0 ? '' : lastDigit > 1 ? 'а' : 'о'
  }`;
};

const dateFormatter = new Intl.DateTimeFormat('ru', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
});

function WordSetHistory() {
  const wordSetHistory = useSelector(store => store.wordSet.history);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { levels } = await dispatch(getWordSetHistory());
        dispatch(initializeWordSetHistory(levels));
      } catch (error) {
        dispatch(setSnackbar({ text: 'Не удалось загрузить историю' }));
      }
    })();
  }, [dispatch]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {wordSetHistory.map(({ levelId, dateTime, wordsCount }) => (
        <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography component="h2" variant="h6" gutterBottom>
                {dateFormatter.format(
                  Date.parse(dateTime ? `${dateTime}Z` : null) || null
                )}
              </Typography>
              <Typography>
                {wordsCount} {pickRightWord(wordsCount)}
              </Typography>
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

export default WordSetHistory;
