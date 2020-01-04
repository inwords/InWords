import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import useDialog from 'src/hooks/useDialog';
import Fab from 'src/components/Fab';
import WordPairAddDialog from './WordPairAddDialog';

import './WordPairAddButton.css';

function WordPairAddButton({ visible }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Zoom in={visible}>
        <div className="word-pair-add-button">
          <Fab id="fab" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </div>
      </Zoom>
      <WordPairAddDialog open={open} handleClose={handleClose} />
    </Fragment>
  );
}

WordPairAddButton.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default WordPairAddButton;
