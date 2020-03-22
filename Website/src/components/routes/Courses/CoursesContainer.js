import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeCourses } from 'src/actions/trainingActions';
import { receiveCourses } from 'src/actions/trainingApiActions';
import Courses from './Courses';

function CoursesContainer() {
  const courses = useSelector(store => store.training.courses);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!courses.length) {
      (async () => {
        try {
          const data = await dispatch(receiveCourses());
          dispatch(initializeCourses(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить курсы' }));
        }
      })();
    }
  }, [courses.length, dispatch]);

  return <Courses courses={courses} />;
}

export default CoursesContainer;
