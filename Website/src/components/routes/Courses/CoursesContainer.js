import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingCategories } from 'src/actions/trainingApiActions';
import Courses from './Courses';

function CoursesContainer() {
  const trainingCategories = useSelector(
    store => store.training.trainingCategories
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!trainingCategories.length) {
      dispatch(receiveTrainingCategories());
    }
  }, [trainingCategories.length, dispatch]);

  return <Courses trainingCategories={trainingCategories} />;
}

export default CoursesContainer;
