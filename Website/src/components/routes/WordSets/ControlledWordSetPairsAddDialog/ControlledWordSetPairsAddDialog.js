import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/components/core/useDialog';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import WordSetPairsAddDialog from './WordSetPairsAddDialog';

function ControlledWordSetPairsAddDialog({ gameId }) {
  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Fragment>
      <IconButton
        data-testid={`add-to-dictionary-${gameId}`}
        onClick={handleOpen}
      >
        <Icon>playlist_add</Icon>
      </IconButton>
      <WordSetPairsAddDialog
        open={open}
        handleClose={handleClose}
        gameId={gameId}
      />
    </Fragment>
  );
}

ControlledWordSetPairsAddDialog.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default ControlledWordSetPairsAddDialog;
