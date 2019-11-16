import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import List from '@material-ui/core/List';
import useDialog from 'src/hooks/useDialog';
import WordlistItem from './WordlistItem';
import WordPairEditDialog from '../WordPairEditDialog';

const WordList = styled(List)`
  margin-bottom: 64px;
`;

function Wordlist({ wordPairs, checkedValues, ...rest }) {
  const { open, setOpen, handleClose } = useDialog();
  const [currentWordPair, setCurrentWordPair] = React.useState();

  const handleOpen = React.useCallback(
    wordPair => () => {
      setOpen(true);
      setCurrentWordPair(wordPair);
    },
    [setOpen]
  );

  return (
    <Fragment>
      <WordList>
        {wordPairs.map(wordPair => (
          <WordlistItem
            key={wordPair.serverId}
            wordPair={wordPair}
            checked={checkedValues.includes(wordPair.serverId)}
            handleOpen={handleOpen}
            {...rest}
          />
        ))}
      </WordList>
      <WordPairEditDialog
        open={open}
        handleClose={handleClose}
        wordPair={currentWordPair}
      />
    </Fragment>
  );
}

Wordlist.propTypes = {
  wordPairs: PropTypes.array.isRequired,
  checkedValues: PropTypes.array.isRequired
};

export default Wordlist;
