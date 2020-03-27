import React from 'react';

const useForm = (initialInputs, handleSubmit) => {
  const [inputs, setInputs] = React.useState(initialInputs);

  const handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmitExtended = event => {
    event.preventDefault();

    if (typeof handleSubmit === 'function') {
      handleSubmit();
    }
  };

  return {
    inputs,
    setInputs,
    handleChange,
    handleSubmit: handleSubmitExtended
  };
};

export default useForm;
