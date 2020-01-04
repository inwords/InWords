import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from 'src/components/Typography';
import IconButton from 'src/components/IconButton';
import DictionarySearch from './DictionarySearch';
import DictionaryMenuButton from './DictionaryMenuButton';

import './DictionaryToolbar.scss';

function DictionaryToolbar({
  editingModeEnabled,
  checkedValues,
  handleDelete,
  handleReset,
  inputs,
  handleChange
}) {
  const numberOfChecked = checkedValues.length;

  return (
    <div className="dictionary-toolbar">
      {!editingModeEnabled ? (
        <Fragment>
          <div className="dictionary-toolbar__title-block dictionary-toolbar__title-block-main">
            <Typography as="h1" variant="h6">
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
            className="dictionary-toolbar__close-button"
          >
            <CloseIcon />
          </IconButton>
          <div className="dictionary-toolbar__title-block">
            <Typography as="h2" variant="h6">
              Выбрано: {numberOfChecked}
            </Typography>
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleDelete();
              handleReset();
            }}
            className="dictionary-toolbar__delete-button"
          >
            <DeleteIcon />
          </IconButton>
          <DictionaryMenuButton checkedValues={checkedValues} />
        </Fragment>
      )}
    </div>
  );
}

DictionaryToolbar.propTypes = {
  editingModeEnabled: PropTypes.bool.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    pattern: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DictionaryToolbar;
