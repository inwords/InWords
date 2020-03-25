import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { resetWordPairsActuality } from 'src/actions/dictionaryActions';
import { addCourseWordPairsToDictionary } from 'src/actions/trainingApiActions';
import CourseWordPairsAddButton from './CourseWordPairsAddButton';

function CourseWordPairsAddButtonContainer({ gameId }) {
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      const data = await dispatch(addCourseWordPairsToDictionary(gameId));
      dispatch(
        setSnackbar({ text: `Добавлено новых слов: ${data.wordsAdded}` })
      );
      dispatch(resetWordPairsActuality());
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  };

  return <CourseWordPairsAddButton gameId={gameId} handleAdd={handleAdd} />;
}

CourseWordPairsAddButtonContainer.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default CourseWordPairsAddButtonContainer;
