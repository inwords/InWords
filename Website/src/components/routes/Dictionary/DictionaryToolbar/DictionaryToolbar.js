import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useDialog from 'src/hooks/useDialog';
import Toolbar from 'src/components/core/Toolbar';
import Icon from 'src/components/core/Icon';
import Typography from 'src/components/core/Typography';
import IconButton from 'src/components/core/IconButton';
import Space from 'src/components/core/Space';
import DictionarySearch from './DictionarySearch';
import DictionaryMenuButton from './DictionaryMenuButton';
import WordPairsDeleteDialog from './WordPairsDeleteDialog';

import './DictionaryToolbar.scss';

function DictionaryToolbar({
  editingModeEnabled,
  checkedValues,
  handleReset,
  handleCheckAll,
  inputs,
  handleChange
}) {
  const numberOfChecked = checkedValues.length;

  const { open, handleOpen, handleClose } = useDialog();

  return (
    <Toolbar>
      {!editingModeEnabled ? (
        <Fragment>
          <div className="dictionary-toolbar-title-block">
            <Typography component="h1" variant="h6">
              Мой словарь
            </Typography>
          </div>
          <Space />
          <DictionarySearch value={inputs.pattern} onChange={handleChange} />
        </Fragment>
      ) : (
        <Fragment>
          <IconButton
            edge="start"
            aria-label="clear selection"
            onClick={handleReset}
            color="inherit"
          >
            <Icon>close</Icon>
          </IconButton>
          <IconButton
            aria-label="check all"
            onClick={handleCheckAll}
            color="inherit"
          >
            <Icon>done_all</Icon>
          </IconButton>
          <Space value={1} />
          <div>
            <Typography component="h2" variant="h6">
              Выбрано: {numberOfChecked}
            </Typography>
          </div>
          <Space />
          <IconButton
            aria-label="delete"
            onClick={handleOpen}
            className="dictionary-toolbar-delete-button"
          >
            <Icon>delete</Icon>
          </IconButton>
          <DictionaryMenuButton checkedValues={checkedValues} />
        </Fragment>
      )}
      <WordPairsDeleteDialog
        open={open}
        handleClose={handleClose}
        checkedValues={checkedValues}
        handleReset={handleReset}
      />
    </Toolbar>
  );
}

DictionaryToolbar.propTypes = {
  editingModeEnabled: PropTypes.bool.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    pattern: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DictionaryToolbar;
