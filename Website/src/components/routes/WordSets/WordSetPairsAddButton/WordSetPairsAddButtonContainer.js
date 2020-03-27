import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'src/actions/commonActions';
import { resetWordPairsActuality } from 'src/actions/dictionaryActions';
import { addWordSetToDictionary } from 'src/actions/wordSetApiActions';
import WordSetPairsAddButton from './WordSetPairsAddButton';

function WordSetPairsAddButtonContainer({ gameId }) {
  const dispatch = useDispatch();

  const handleAdd = async () => {
    try {
      const data = await dispatch(addWordSetToDictionary(gameId));
      dispatch(
        setSnackbar({ text: `Добавлено новых слов: ${data.wordsAdded}` })
      );
      dispatch(resetWordPairsActuality());
    } catch (error) {
      dispatch(setSnackbar({ text: 'Не удалось добавить слова' }));
    }
  };

  return <WordSetPairsAddButton gameId={gameId} handleAdd={handleAdd} />;
}

WordSetPairsAddButtonContainer.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default WordSetPairsAddButtonContainer;
