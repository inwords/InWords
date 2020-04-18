import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeWordSetLevel } from 'src/actions/wordSetActions';
import { getWordSetLevel } from 'src/actions/wordSetApiActions';

export default function useServerTrainingLevel() {
  const levelsMap = useSelector(store => store.wordSet.levelsMap);

  const dispatch = useDispatch();

  const { levelId: paramLevelId } = useParams();

  useEffect(() => {
    if (!levelsMap[paramLevelId]) {
      (async () => {
        try {
          const data = await dispatch(getWordSetLevel(paramLevelId));
          dispatch(initializeWordSetLevel(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровень' }));
        }
      })();
    }
  }, [levelsMap, dispatch, paramLevelId]);

  return (
    levelsMap[paramLevelId] || {
      levelId: +paramLevelId,
      wordTranslations: []
    }
  );
}
