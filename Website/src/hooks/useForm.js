import React from 'react';

export default function useForm(initialInputs = {}, action) {
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
    if (typeof action === 'function') {
      action();
    }

    event.preventDefault();
  };

  return {
    inputs,
    setInputs,
    handleChange,
    handleSubmit
  };
}
