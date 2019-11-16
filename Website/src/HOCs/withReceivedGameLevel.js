import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingLevel as receiveTrainingLevelAction } from 'src/actions/trainingApiActions';

function withReceivedTrainingLevel(WrappedComponent) {
  function WithReceivedTrainingLevel({ match, history, ...rest }) {
    const { levelId, wordTranslations } = useSelector(
      store => store.training.trainingLevel
    );

    const dispatch = useDispatch();

    const paramLevelId = +match.params.levelId;

    React.useEffect(() => {
      if (levelId !== paramLevelId) {
        if (paramLevelId === 0) {
          history.push('/dictionary');
        }

        dispatch(receiveTrainingLevelAction(paramLevelId));
      }
    }, [levelId, paramLevelId, dispatch, history]);

    return (
      levelId === paramLevelId && (
        <WrappedComponent
          levelId={levelId}
          wordTranslations={wordTranslations}
          {...rest}
        />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithReceivedTrainingLevel.displayName = `withReceivedTrainingLevel(${wrappedComponentName})`;

  WithReceivedTrainingLevel.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  return WithReceivedTrainingLevel;
}

export default withReceivedTrainingLevel;
