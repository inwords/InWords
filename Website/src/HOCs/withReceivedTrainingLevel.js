import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingLevel } from 'src/actions/trainingApiActions';

function withReceivedTrainingLevel(WrappedComponent) {
  function WithReceivedTrainingLevel(props) {
    const params = useParams();
    const history = useHistory();

    const trainingLevelsMap = useSelector(
      store => store.training.trainingLevelsMap
    );

    const dispatch = useDispatch();

    const paramLevelId = +params.levelId;

    React.useEffect(() => {
      if (
        !trainingLevelsMap[paramLevelId] ||
        !trainingLevelsMap[paramLevelId].wordTranslations.length
      ) {
        switch (paramLevelId) {
          case 0:
            history.push('/training');
            return;
          case -1:
            history.push('/dictionary');
            return;
          default:
        }

        if (!trainingLevelsMap[paramLevelId]) {
          dispatch(receiveTrainingLevel(paramLevelId));
        }
      }
    }, [trainingLevelsMap, paramLevelId, dispatch, history]);

    return (
      Boolean(trainingLevelsMap[paramLevelId]) && (
        <WrappedComponent
          levelId={trainingLevelsMap[paramLevelId].levelId}
          wordTranslations={trainingLevelsMap[paramLevelId].wordTranslations}
          {...props}
        />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedTrainingLevel.displayName = `withReceivedTrainingLevel(${wrappedComponentName})`;

  return WithReceivedTrainingLevel;
}

export default withReceivedTrainingLevel;
