import { useState, useContext } from 'react';
import { FocusVisibleContext } from 'src/components/core/FocusVisibleManager';

const useFocusVisible = () => {
  const [focused, setFocused] = useState(false);
  const { hadKeyboardEvent, initialized } = useContext(FocusVisibleContext);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const focusVisible = initialized ? hadKeyboardEvent && focused : focused;

  return {
    focusVisible,
    onFocus,
    onBlur
  };
};

export default useFocusVisible;
