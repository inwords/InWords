import React, { useEffect, useRef } from 'react';
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

  const { inputs, handleChange } = useForm({ search: '' });

  const timerRef = useRef();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(setSearchWord, 200, inputs.search);
  }, [inputs, setSearchWord]);

  return (
    <WordlistToolbar
      numberOfChecked={checkedValues.length}
      handleDelete={handleDelete}
      inputs={inputs}
      handleChange={handleChange}
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
