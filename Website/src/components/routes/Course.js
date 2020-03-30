import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeCourse } from 'src/actions/trainingActions';
import { receiveCourse } from 'src/actions/trainingApiActions';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Icon from 'src/components/core/Icon';
import LinkButton from 'src/components/core/LinkButton';

function Course() {
  const coursesMap = useSelector(store => store.training.coursesMap);

  const dispatch = useDispatch();

  const params = useParams();
  const wordSetId = params.wordSetId;

  const course = coursesMap[wordSetId];

  React.useEffect(() => {
    if (!course) {
      (async () => {
        try {
          const data = await dispatch(receiveCourse(wordSetId));
          dispatch(initializeCourse(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
        }
      })();
    }
  }, [course, dispatch, wordSetId]);

  const match = useRouteMatch();

  return (
    <Grid spacing={3}>
      {Boolean(course) &&
        course.levelsInfo.map(
          ({ levelId, playerStars, isAvailable, level }) => (
            <GridItem key={levelId} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader title={`Уровень ${level}`} />
                <CardContent>
                  <div>
                    <Icon color={playerStars > 0 ? 'gold' : 'disabled'}>
                      star
                    </Icon>
                    <Icon color={playerStars > 1 ? 'gold' : 'disabled'}>
                      star
                    </Icon>
                    <Icon color={playerStars > 2 ? 'gold' : 'disabled'}>
                      star
                    </Icon>
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
          )
        )}
    </Grid>
  );
}

export default Course;
