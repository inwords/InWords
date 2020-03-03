import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Icon from 'src/components/core/Icon';
import Typography from 'src/components/core/Typography';
import IconButton from 'src/components/core/IconButton';
import DictionarySearch from './DictionarySearch';
import DictionaryMenuButton from './DictionaryMenuButton';

import './DictionaryToolbar.scss';

function DictionaryToolbar({
  editingModeEnabled,
  checkedValues,
  handleDelete,
  handleReset,
  handleCheckAll,
  inputs,
  handleChange
}) {
  const numberOfChecked = checkedValues.length;

  return (
    <Toolbar>
      {!editingModeEnabled ? (
        <Fragment>
          <div className="dictionary-toolbar-title-block dictionary-toolbar-title-block-main">
            <Typography component="h1" variant="h6">
              Мой словарь
            </Typography>
          </div>
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
            className="dictionary-toolbar-done-all-button"
          >
            <Icon>done_all</Icon>
          </IconButton>
          <div className="dictionary-toolbar-title-block">
            <Typography component="h2" variant="h6">
              Выбрано: {numberOfChecked}
            </Typography>
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDelete();
              handleReset();
            }}
            className="dictionary-toolbar-delete-button"
          >
            <Icon>delete</Icon>
          </IconButton>
          <DictionaryMenuButton checkedValues={checkedValues} />
        </Fragment>
      )}
    </Toolbar>
  );
}

DictionaryToolbar.propTypes = {
  editingModeEnabled: PropTypes.bool.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    pattern: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DictionaryToolbar;
