import { useState } from 'react';

export default function useForm(initialInputs, action) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = event => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    if (action) {
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
