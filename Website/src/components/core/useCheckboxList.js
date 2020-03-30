import React from 'react';

const useCheckboxList = (initialState = []) => {
  const [checkedValues, setCheckedValues] = React.useState(initialState);

  const handleToggle = value => () => {
    setCheckedValues(checkedValues => {
      const currentIndex = checkedValues.indexOf(value);
      const newChecked = [...checkedValues];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      return newChecked;
    });
  };

  return {
    checkedValues,
    setCheckedValues,
    handleToggle
  };
};

export default useCheckboxList;
