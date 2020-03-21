import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeLevel } from 'src/actions/trainingActions';
import { receiveTrainingWordPairs } from 'src/actions/trainingApiActions';
import TrainingTypes from 'src/components/routes/common/TrainingTypes';

function MainTrainingTypes() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      try {
        const data = await dispatch(receiveTrainingWordPairs());
        dispatch(
          initializeLevel({
            levelId: 0,
            wordTranslations: data
          })
        );
      } catch (error) {
        dispatch(
          setSnackbar({
            text: 'Не удалось загрузить слова для повторения'
          })
        );
      }
    })();
  }, [dispatch]);

  const levelsMap = useSelector(store => store.training.levelsMap);

  return <TrainingTypes trainingLevel={levelsMap[0] || { levelId: 0 }} />;
}

MainTrainingTypes.propTypes = {
  level: PropTypes.number
};

export default MainTrainingTypes;
