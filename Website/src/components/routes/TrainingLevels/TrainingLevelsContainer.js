import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeCourse } from 'src/actions/trainingActions';
import { receiveCourse } from 'src/actions/trainingApiActions';
import TrainingLevels from './TrainingLevels';

function TrainingLevelsContainer() {
  const coursesMap = useSelector(store => store.training.coursesMap);

  const params = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!coursesMap[params.courseId]) {
      (async () => {
        try {
          const data = await dispatch(receiveCourse(params.courseId));
          dispatch(initializeCourse(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
        }
      })();
    }
  }, [coursesMap, dispatch, params.courseId]);

  return (
    Boolean(coursesMap[params.courseId]) && (
      <TrainingLevels course={coursesMap[params.courseId]} />
    )
  );
}

export default TrainingLevelsContainer;
