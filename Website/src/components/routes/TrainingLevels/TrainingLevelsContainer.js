import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeCourse } from 'src/actions/trainingActions';
import { receiveCourse } from 'src/actions/trainingApiActions';
import TrainingLevels from './TrainingLevels';

function TrainingLevelsContainer() {
  const coursesMap = useSelector(store => store.training.coursesMap);

  const dispatch = useDispatch();

  const params = useParams();
  const courseId = params.courseId;

  React.useEffect(() => {
    if (!coursesMap[courseId]) {
      (async () => {
        try {
          const data = await dispatch(receiveCourse(courseId));
          dispatch(initializeCourse(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
        }
      })();
    }
  }, [coursesMap, dispatch, courseId]);

  return (
    Boolean(coursesMap[courseId]) && (
      <TrainingLevels course={coursesMap[courseId]} />
    )
  );
}

export default TrainingLevelsContainer;
