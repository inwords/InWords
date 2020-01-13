import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SchoolIcon from '@material-ui/icons/School';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';
import useDialog from 'src/hooks/useDialog';
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

function TrainingTypes({ trainingTypesInfo, level = 0 }) {
  const match = useRouteMatch();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (level !== -1 && !trainingLevelsMap[0]) {
      dispatch(receiveTrainingWordPairs());
    }
  }, [trainingLevelsMap, dispatch]);

  const trainingLevelsMap = useSelector(
    store => store.training.trainingLevelsMap
  );

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
                  {trainingLevelsMap[level] && (
                    <div className="training-type-card-pairs-info">
                      <SchoolIcon
                        color="action"
                        className="training-type-card-pairs-info__icon"
                      />
                      <Typography className="training-type-card-pairs-info__text">
                        На изучение:{' '}
                        {trainingLevelsMap[level].wordTranslations.length}
                      </Typography>
                    </div>
                  )}
                </CardContent>
                <CardActions>
                  <LinkButton
                    component={RouterLink}
                    to={`${match.url}/${typeId}/${level}`}
                    primary
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
  trainingTypesInfo: PropTypes.arrayOf(
    PropTypes.exact({
      typeId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  level: PropTypes.number
};

export default TrainingTypes;
