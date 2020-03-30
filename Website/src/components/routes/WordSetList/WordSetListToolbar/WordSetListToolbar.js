import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';

import './WordSetListToolbar.css';

function WordSetListToolbar({
  checkedValues,
  selectionAvailable,
  handleReset,
  handleCheckAll,
  handleAdd
}) {
  const numberOfChecked = checkedValues.length;

  return (
    <Toolbar className="word-set-list-toolbar">
      <IconButton
        aria-label="clear selection"
        disabled={!selectionAvailable}
        onClick={handleReset}
        color="inherit"
        edge="start"
      >
        <Icon>close</Icon>
      </IconButton>
      <IconButton
        aria-label="check all"
        disabled={!selectionAvailable}
        onClick={handleCheckAll}
        color="inherit"
      >
        <Icon>done_all</Icon>
      </IconButton>
      <Space value={1} />
      <div style={{ display: selectionAvailable ? 'block' : 'none' }}>
        <Typography component="h2" variant="h6">
          Выбрано: {numberOfChecked}
        </Typography>
      </div>
      <Space />
      <IconButton
        disabled={numberOfChecked === 0}
        onClick={() => {
          handleAdd();
          handleReset();
        }}
        color="primary"
        edge="end"
      >
        <Icon>add</Icon>
      </IconButton>
    </Toolbar>
  );
}

WordSetListToolbar.propTypes = {
  checkedValues: PropTypes.array.isRequired,
  selectionAvailable: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default WordSetListToolbar;
