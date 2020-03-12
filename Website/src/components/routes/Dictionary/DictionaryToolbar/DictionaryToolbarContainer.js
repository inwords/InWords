import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'src/hooks/useForm';
import DictionaryToolbar from './DictionaryToolbar';

function DictionaryToolbarContainer({ setPattern, ...rest }) {
  const { inputs, handleChange } = useForm({ pattern: '' });

  React.useEffect(() => {
    let timerId = window.setTimeout(() => {
      setPattern(inputs.pattern);
    }, 200);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [inputs.pattern, setPattern]);

  return (
    <DictionaryToolbar inputs={inputs} handleChange={handleChange} {...rest} />
  );
}

DictionaryToolbarContainer.propTypes = {
  setPattern: PropTypes.func.isRequired,
  checkedValues: PropTypes.array,
  handleReset: PropTypes.func,
  editingModeEnabled: PropTypes.bool
};

export default DictionaryToolbarContainer;
