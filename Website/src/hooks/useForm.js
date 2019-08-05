import { useState } from 'react';
import PropTypes from 'prop-types';

function useForm(initialInputs = {}, callback = Function.prototype) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = event => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    callback();
    event.preventDefault();
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
    handleReset,
  };
}

useForm.propTypes = {
  initialInputs: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired,
};

export default useForm;
