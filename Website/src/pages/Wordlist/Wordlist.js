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
  checkedValues,
  handleToggle,
  handleReset,
  setSearchWord
}) {
  const [listHeight, setListHeight] = useState(0);

  const divEl = useRef(null);
  const resizeTimerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      window.clearTimeout(resizeTimerRef.current);

      resizeTimerRef.current = window.setTimeout(
        setListHeight,
        200,
        window.innerHeight - divEl.current.getBoundingClientRect().top - 18
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container component="div" maxWidth="md">
      <Paper elevation={1}>
        <WordlistToolbar
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
            handleToggle
          }}
          itemSize={60}
        >
          {WordPairRow}
        </FixedSizeList>
      </Paper>
      <WordPairAddButton visible={checkedValues.length === 0} />
    </Container>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  setSearchWord: PropTypes.func.isRequired
};

export default Wordlist;
