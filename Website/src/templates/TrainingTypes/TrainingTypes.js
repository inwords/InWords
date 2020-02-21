import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import useDialog from 'src/hooks/useDialog';
import Icon from 'src/components/Icon';
import Grid from 'src/components/Grid';
import GridItem from 'src/components/GridItem';
import Card from 'src/components/Card';
import CardHeader from 'src/components/CardHeader';
import CardContent from 'src/components/CardContent';
import CardActions from 'src/components/CardActions';
import Typography from 'src/components/Typography';
import LinkButton from 'src/components/LinkButton';
import TrainingSettingsMenuButton from './TrainingSettingsMenuButton';
import TrainingSettingsDialog from './TrainingSettingsDialog';

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

  const [currentTypeId, setCurrentTypeId] = React.useState();

  const { open, setOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Grid spacing={3}>
        {trainingTypesInfo.map(({ typeId, title, description }) => {
          return (
            <GridItem key={typeId} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={title}
                  action={
                    <TrainingSettingsMenuButton
                      handleOpen={() => {
                        setCurrentTypeId(typeId);
                        setOpen(!open);
                      }}
                    />
                  }
                />
                <CardContent>
                  <Typography component="p">{description}</Typography>
                  {trainingLevel.wordTranslations && (
                    <div className="training-type-card-pairs-info">
                      <Icon
                        color="action"
                        className="training-type-card-pairs-info__icon"
                      >
                        school
                      </Icon>
                      <Typography className="training-type-card-pairs-info__text">
                        Слов на изучение:{' '}
                        {trainingLevel.wordTranslations.length}
                      </Typography>
                    </div>
                  )}
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
      <TrainingSettingsDialog
        open={open}
        handleClose={handleClose}
        typeId={currentTypeId}
      />
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
