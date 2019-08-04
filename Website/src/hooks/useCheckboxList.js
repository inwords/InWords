import { useState } from 'react';

function useCheckboxList() {
  const [checked, setChecked] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleReset = () => {
    setChecked([]);
  };

  return {
    checked,
    handleToggle,
    handleReset,
  };
}

export default useCheckboxList;
