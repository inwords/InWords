import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const FocusVisibleContext = createContext({
  hadKeyboardEvent: true,
  initialized: false
});

function FocusVisibleManager({ children }) {
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(true);

  useEffect(() => {
    const onKeyDown = event => {
      if (event.metaKey || event.altKey || event.ctrlKey) {
        return;
      }

      setHadKeyboardEvent(true);
    };

    const onPointerDown = () => {
      setHadKeyboardEvent(false);
    };

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('mousedown', onPointerDown, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('touchstart', onPointerDown, true);
    };
  }, []);

  return (
    <FocusVisibleContext.Provider
      value={{ hadKeyboardEvent, initialized: true }}
    >
      {children}
    </FocusVisibleContext.Provider>
  );
}

FocusVisibleManager.propTypes = {
  children: PropTypes.node
};

export default FocusVisibleManager;
