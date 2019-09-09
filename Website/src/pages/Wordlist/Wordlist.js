import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import WordPairsDeleteToolbar from './WordPairsDeleteToolbar';
import WordPairRow from './WordPairRow';
import WordPairAddButton from './WordPairAddButton';

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.background.paper
  }
}));

function Wordlist({ wordPairs, checkedValues, handleToggle, handleReset }) {
  const classes = useStyles();

  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(
        window.innerHeight - divEl.current.getBoundingClientRect().top - 24
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const divEl = useRef(null);

  return (
    <Container component="div" maxWidth="md">
      <Paper>
        <WordPairsDeleteToolbar
          checkedValues={checkedValues}
          handleReset={handleReset}
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
            handleReset
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
  handleToggle: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Wordlist;
