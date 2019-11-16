import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useDialog from 'src/hooks/useDialog';
import WordPairAddDialog from './WordPairAddDialog';

const FixedFab = styled(Fab)`
  position: fixed;
  bottom: 16px;
  right: 16px;
`;

function WordPairAddButton({ visible }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <Zoom in={visible}>
        <FixedFab
          id="fab"
          aria-label="add"
          onClick={handleOpen}
          color="primary"
        >
          <AddIcon />
        </FixedFab>
      </Zoom>
      <WordPairAddDialog open={open} handleClose={handleClose} />
    </Fragment>
  );
}

WordPairAddButton.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default WordPairAddButton;
