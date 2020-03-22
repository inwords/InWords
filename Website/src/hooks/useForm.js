import React from 'react';

const useForm = (initialInputs, action) => {
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

  const handleSubmit = event => {
    event.preventDefault();

    if (typeof action === 'function') {
      action();
    }
  };

  return {
    inputs,
    setInputs,
    handleChange,
    handleSubmit
  };
};

export default useForm;
