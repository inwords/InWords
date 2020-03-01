import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Icon from 'src/components/core/Icon';
import Grid from 'src/components/core/Grid';
import GridItem from 'src/components/core/GridItem';
import Card from 'src/components/core/Card';
import CardHeader from 'src/components/core/CardHeader';
import CardContent from 'src/components/core/CardContent';
import CardActions from 'src/components/core/CardActions';
import Typography from 'src/components/core/Typography';
import LinkButton from 'src/components/core/LinkButton';

import './TrainingTypes.scss';

const trainingTypesInfo = [
  {
    typeId: 0,
    title: 'Закрытые карточки',
    description: 'Необходимо правильно открыть пару карточек «Слово-Перевод»'
  }
];

function TrainingTypes({ trainingLevel }) {
  const match = useRouteMatch();

  return (
    <Fragment>
      <Paper>
        {trainingLevel.wordTranslations && (
          <Toolbar variant="dense" className="training-types-toolbar">
            <Icon color="action" className="training-types-study-icon">
              school
            </Icon>
            <Typography variant="body1" className="training-types-study-text">
              Слов на изучение: {trainingLevel.wordTranslations.length}
            </Typography>
          </Toolbar>
        )}
      </Paper>
      <Grid spacing={3}>
        {trainingTypesInfo.map(({ typeId, title, description }) => {
          return (
            <GridItem key={typeId} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader title={title} />
                <CardContent>
                  <Typography component="p">{description}</Typography>
                  {/* {trainingLevel.wordTranslations && (
                    <div className="training-type-card-pairs-info">
                      
                    </div>
                  )} */}
                </CardContent>
                <CardActions>
                  <LinkButton
                    component={RouterLink}
                    to={`${match.url}/${typeId}`}
                    variant="text"
                    color="primary"
                  >
                    Поплыли
                  </LinkButton>
                </CardActions>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Fragment>
  );
}

TrainingTypes.propTypes = {
  trainingLevel: PropTypes.shape({
    levelId: PropTypes.number.isRequired,
    wordTranslations: PropTypes.array
  }).isRequired
};

export default TrainingTypes;
