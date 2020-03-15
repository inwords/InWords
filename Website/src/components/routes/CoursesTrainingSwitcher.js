import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateLevelResult } from 'src/actions/trainingActions';
import useServerTrainingLevel from 'src/components/routes/common-hooks/useServerTrainingLevel';
import TrainingSwitcher from 'src/components/routes/common/TrainingSwitcher';

function CoursesTrainingSwitcher(props) {
  const trainingLevel = useServerTrainingLevel();

  const dispatch = useDispatch();

  const coursesMap = useSelector(store => store.training.coursesMap);

  const history = useHistory();
  const params = useParams();

  const onResult = ({ levelResult }) => {
    dispatch(updateLevelResult(params.courseId, levelResult));
  };

  const onNextLevel = () => {
    const course = coursesMap[params.courseId];

    if (course) {
      const currentLevelIndex = course.levelsInfo.findIndex(
        ({ levelId }) => levelId === +params.levelId
      );

      if (currentLevelIndex !== -1) {
        const nextLevelIndex = currentLevelIndex + 1;
        const nextLevel = course.levelsInfo[nextLevelIndex];

        if (nextLevel) {
          history.push(
            `/training/courses/${params.courseId}/${nextLevel.levelId}/${params.trainingId}`
          );

          return;
        }
      }
    }

    history.push('/training/courses');
  };

  return (
    <TrainingSwitcher
      onResult={onResult}
      onNextLevel={onNextLevel}
      trainingLevel={trainingLevel}
      {...props}
    />
  );
}

export default CoursesTrainingSwitcher;
