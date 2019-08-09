import { useState } from 'react';

export default function useForm(initialInputs = {}, actionOnSubmit = null) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = event => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    if (actionOnSubmit) {
      actionOnSubmit();
    }

    event.preventDefault();
  };

  const handleReset = () => {
    setInputs(initialInputs);
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
    handleReset
  };
}
