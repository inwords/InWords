import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import WordlistToolbar from './WordlistToolbar';
import WordPairRow from './WordPairRow';
import WordPairAddButton from './WordPairAddButton';

const useStyles = makeStyles(theme => ({
  list: {
    paddingBottom: theme.spacing(6)
  }
}));

function Wordlist({
  wordPairs,
  editingMode,
  handleButtonPress,
  handleButtonRelease,
  checkedValues,
  handleToggle,
  handleReset,
  setSearchWord
}) {
  const classes = useStyles();

  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(
        window.innerHeight - divEl.current.getBoundingClientRect().top - 18
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const divEl = useRef(null);

  return (
    <Container component="div" maxWidth="md">
      <Paper elevation={1}>
        <WordlistToolbar
          editingMode={editingMode}
          checkedValues={checkedValues}
          handleReset={handleReset}
          setSearchWord={setSearchWord}
        />
        <Divider ref={divEl} />
        <FixedSizeList
          height={listHeight}
          outerElementType={List}
          itemCount={wordPairs.length}
          itemData={{
            wordPairs,
            checkedValues,
            handleToggle,
            handleReset,
            editingMode,
            handleButtonPress,
            handleButtonRelease
          }}
          itemSize={60}
          className={classes.list}
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
  editingMode: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  setSearchWord: PropTypes.func.isRequired
};

export default Wordlist;
