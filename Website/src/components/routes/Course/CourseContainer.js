import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { initializeCourse } from 'src/actions/trainingActions';
import { receiveCourse } from 'src/actions/trainingApiActions';
import Course from './Course';

function CourseContainer() {
  const coursesMap = useSelector(store => store.training.coursesMap);

  const dispatch = useDispatch();

  const params = useParams();
  const wordSetId = params.wordSetId;

  React.useEffect(() => {
    if (!coursesMap[wordSetId]) {
      (async () => {
        try {
          const data = await dispatch(receiveCourse(wordSetId));
          dispatch(initializeCourse(data));
        } catch (error) {
          dispatch(setSnackbar({ text: 'Не удалось загрузить уровни' }));
        }
      })();
    }
  }, [coursesMap, dispatch, wordSetId]);

  return (
    Boolean(coursesMap[wordSetId]) && <Course course={coursesMap[wordSetId]} />
  );
}

export default CourseContainer;
