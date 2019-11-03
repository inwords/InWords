import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { setSnackbar } from 'src/actions/commonActions';
import { deleteWordPairs } from 'src/actions/wordPairsApiActions';
import useForm from 'src/hooks/useForm';
import DictionaryToolbar from './DictionaryToolbar';
import DynamicToolbarWrapper from './DynamicToolbarWrapper';

function DictionaryToolbarContainer({ checkedValues, setPattern, ...rest }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      setSnackbar({
        text: 'Слова будут удалены через 5 секунд',
        actionText: 'Отменить',
        actionHandler: () => {
          window.clearTimeout(timerId);
        }
      })
    );

    let timerId = window.setTimeout(() => {
      dispatch(deleteWordPairs(checkedValues));
    }, 5100);
  };

  const { inputs, handleChange } = useForm({ pattern: '' });

  const searchTimerRef = useRef();

  useEffect(() => {
    window.clearTimeout(searchTimerRef.current);
    searchTimerRef.current = window.setTimeout(() => {
      setPattern(inputs.pattern);
    }, 200);
  }, [inputs, setPattern]);

  const toolbar = (
    <DictionaryToolbar
      checkedValues={checkedValues}
      handleDelete={handleDelete}
      inputs={inputs}
      handleChange={handleChange}
      {...rest}
    />
  );

  return (
    <>
      <DynamicToolbarWrapper>
        <Container component="div" maxWidth="md">
          {toolbar}
        </Container>
      </DynamicToolbarWrapper>
      {toolbar}
    </>
  );
}

DictionaryToolbarContainer.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  setPattern: PropTypes.func.isRequired,
  handleReset: PropTypes.func,
  editingModeEnabled: PropTypes.bool
};

export default DictionaryToolbarContainer;
