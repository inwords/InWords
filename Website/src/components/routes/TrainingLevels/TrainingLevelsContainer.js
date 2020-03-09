import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveCourse } from 'src/actions/trainingApiActions';
import TrainingLevels from './TrainingLevels';

function TrainingLevelsContainer() {
  const course = useSelector(store => store.training.course);

  const params = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!course.trainingId || course.trainingId !== +params.courseId) {
      dispatch(receiveCourse(params.courseId));
    }
  }, [course, dispatch, params.courseId]);

  return (
    course.trainingId === +params.courseId && <TrainingLevels course={course} />
  );
}

export default TrainingLevelsContainer;
