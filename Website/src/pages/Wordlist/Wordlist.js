import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import WordlistToolbar from './WordlistToolbar';
import WordPairRow from './WordPairRow';
import WordPairAddButton from './WordPairAddButton';

function Wordlist({
  wordPairs,
  editingModeEnabled,
  handleButtonPress,
  handleButtonRelease,
  checkedValues,
  handleToggle,
  handleReset,
  setSearchWord
}) {
  const [listHeight, setListHeight] = useState(0);

  const divEl = useRef(null);
  const resizeTimerRef = useRef();

  useEffect(() => {
    const getListHeight = () =>
      window.innerHeight - divEl.current.getBoundingClientRect().top - 18;

    const handleResize = () => {
      window.clearTimeout(resizeTimerRef.current);

      resizeTimerRef.current = window.setTimeout(() => {
        setListHeight(getListHeight());
      }, 200);
    };

    setListHeight(getListHeight());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container component="div" maxWidth="md">
      <Paper elevation={1}>
        <WordlistToolbar
          editingModeEnabled={editingModeEnabled}
          checkedValues={checkedValues}
          handleReset={handleReset}
          setSearchWord={setSearchWord}
        />
        <Divider ref={divEl} />
        <FixedSizeList
          height={listHeight}
          width="100%"
          outerElementType={List}
          itemCount={wordPairs.length}
          itemData={{
            wordPairs,
            checkedValues,
            handleToggle,
            editingModeEnabled,
            handleButtonPress,
            handleButtonRelease
          }}
          itemSize={60}
          onScroll={handleButtonRelease}
        >
          {WordPairRow}
        </FixedSizeList>
      </Paper>
      <WordPairAddButton visible={!editingModeEnabled} />
    </Container>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  editingModeEnabled: PropTypes.bool.isRequired,
  handleButtonPress: PropTypes.func,
  handleButtonRelease: PropTypes.func,
  checkedValues: PropTypes.array,
  handleToggle: PropTypes.func,
  handleReset: PropTypes.func,
  setSearchWord: PropTypes.func
};

export default Wordlist;
