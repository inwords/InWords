import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveCourses } from 'src/actions/trainingApiActions';
import Courses from './Courses';

function CoursesContainer() {
  const courses = useSelector(store => store.training.courses);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!courses.length) {
      dispatch(receiveCourses());
    }
  }, [courses.length, dispatch]);

  return <Courses courses={courses} />;
}

export default CoursesContainer;
