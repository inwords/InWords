import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeLevel } from 'src/actions/trainingActions';
import { receiveLevel } from 'src/actions/trainingApiActions';

export default function useServerTrainingLevel() {
  const levelsMap = useSelector(store => store.training.levelsMap);

  const dispatch = useDispatch();

  const params = useParams();

  const paramLevelId = +params.levelId;

  React.useEffect(() => {
    if (!levelsMap[paramLevelId]) {
      (async () => {
        try {
          const data = await dispatch(receiveLevel(paramLevelId));
          dispatch(initializeLevel(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровень' }));
        }
      })();
    }
  }, [levelsMap, dispatch, paramLevelId]);

  return (
    levelsMap[paramLevelId] || {
      levelId: paramLevelId,
      wordTranslations: []
    }
  );
}
