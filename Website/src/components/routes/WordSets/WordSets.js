import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSets } from 'src/actions/wordSetActions';
import { getWordSets } from 'src/actions/wordSetApiActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardMedia from 'src/components/core/CardMedia';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';
import Tooltip from 'src/components/core/Tooltip';
import ControlledWordSetPairsAddDialog from './ControlledWordSetPairsAddDialog';

import './WordSets.css';

function WordSets() {
  const wordSets = useSelector(store => store.wordSet.all);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!wordSets.length) {
      (async () => {
        try {
          const data = await dispatch(getWordSets());
          dispatch(initializeWordSets(data.wordSets));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить курсы' }));
        }
      })();
    }
  }, [wordSets.length, dispatch]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {wordSets.map(({ id, title, description, picture }) => (
        <GridItem key={id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardHeader title={title} />
            {picture && (
              <CardMedia
                src={picture}
                alt={title}
                className="word-set-card-media"
              />
            )}
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
            <CardActions>
              <LinkButton
                data-testid={`to-word-set-${id}`}
                component={Link}
                to={`${match.url}/${id}`}
                variant="text"
                color="primary"
              >
                Пройти
              </LinkButton>
              <Space />
              <Tooltip
                id="word-set-pairs-tooltip"
                title="Посмотреть слова"
                placement="bottom"
              >
                <IconButton
                  aria-label="посмотреть слова"
                  data-testid={`to-word-set-${id}-pairs`}
                  component={Link}
                  to={`${match.url}/${id}/word-pairs`}
                >
                  <Icon>list</Icon>
                </IconButton>
              </Tooltip>
              <ControlledWordSetPairsAddDialog gameId={id} />
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}

export default WordSets;
