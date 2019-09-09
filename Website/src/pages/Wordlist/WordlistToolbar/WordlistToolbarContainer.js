import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'actions/commonActions';
import { deleteWordPairs } from 'actions/wordPairsApiActions';
import useForm from 'hooks/useForm';
import WordlistToolbar from './WordlistToolbar';

function WordlistToolbarContainer({ checkedValues, setSearchWord, ...rest }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      setSnackbar({
        text: 'Слова будут удалены через 5 секунд',
        actionText: 'Отменить',
        actionHandler: () => {
          clearTimeout(timerId);
        }
      })
    );

    let timerId = setTimeout(dispatch, 5100, deleteWordPairs(checkedValues));
  };

  const { inputs, handleChange, handleSubmit } = useForm({ search: '' }, () => {
    setSearchWord(inputs.search);
  });

  return (
    <WordlistToolbar
      numberOfChecked={checkedValues.length}
      handleDelete={handleDelete}
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      {...rest}
    />
  );
}

WordlistToolbarContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setSearchWord: PropTypes.func.isRequired,
  handleReset: PropTypes.func
};

export default WordlistToolbarContainer;
