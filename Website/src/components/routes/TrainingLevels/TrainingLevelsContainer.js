import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveCourse } from 'src/actions/trainingApiActions';
import TrainingLevels from './TrainingLevels';

function TrainingLevelsContainer() {
  const coursesMap = useSelector(store => store.training.coursesMap);

  const params = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!coursesMap[params.courseId]) {
      dispatch(receiveCourse(params.courseId));
    }
  }, [coursesMap, dispatch, params.courseId]);

  return (
    Boolean(coursesMap[params.courseId]) && (
      <TrainingLevels course={coursesMap[params.courseId]} />
    )
  );
}

export default TrainingLevelsContainer;
