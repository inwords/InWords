import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Wordlist from './Wordlist';

function WordlistContainer({ setEditingModeEnabled, ...rest }) {
  const [listHeight, setListHeight] = useState(0);

  const listRef = useRef();
  const resizingTimerRef = useRef();

  useEffect(() => {
    const getListHeight = () =>
      window.innerHeight -
      listRef.current.getBoundingClientRect().top -
      16;

    const handleResize = () => {
      window.clearTimeout(resizingTimerRef.current);

      resizingTimerRef.current = window.setTimeout(() => {
        setListHeight(getListHeight());
      }, 200);
    };

    setListHeight(getListHeight());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buttonPressTimerRef = useRef();

  const handlePressButton = () => {
    buttonPressTimerRef.current = window.setTimeout(() => {
      setEditingModeEnabled(true);
    }, 500);
  };

  const handleReleaseButton = () => {
    window.clearTimeout(buttonPressTimerRef.current);
  };

  return (
    <Wordlist
      listHeight={listHeight}
      listRef={listRef}
      handlePressButton={handlePressButton}
      handleReleaseButton={handleReleaseButton}
      {...rest}
    />
  );
}

WordlistContainer.propTypes = {
  editingModeEnabled: PropTypes.bool,
  setEditingModeEnabled: PropTypes.func.isRequired,
  wordPairs: PropTypes.array,
  checkedValues: PropTypes.array,
  handleToggle: PropTypes.func
};

export default WordlistContainer;
