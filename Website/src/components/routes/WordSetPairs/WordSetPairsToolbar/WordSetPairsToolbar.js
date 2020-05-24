import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';
import Tooltip from 'src/components/core/Tooltip';

import './WordSetPairsToolbar.scss';

function WordSetPairsToolbar({
  checkedValues,
  selectionAvailable,
  handleReset,
  handleCheckAll,
  handleAdd
}) {
  const numberOfChecked = checkedValues.length;

  return (
    <Toolbar className="word-set-pairs-toolbar">
      <IconButton
        aria-label="сбросить выбор"
        disabled={!selectionAvailable}
        onClick={handleReset}
        color="inherit"
        edge="start"
      >
        <Icon>close</Icon>
      </IconButton>
      <IconButton
        aria-label="выбрать все"
        disabled={!selectionAvailable}
        onClick={handleCheckAll}
        color="inherit"
      >
        <Icon>done_all</Icon>
      </IconButton>
      <Space x={1} />
      <div style={{ display: selectionAvailable ? 'block' : 'none' }}>
        <Typography component="h2" variant="h6">
          Выбрано: {numberOfChecked}
        </Typography>
      </div>
      <Space />
      <Tooltip
        id="word-set-pairs-add-tooltip"
        title="Добавить в&nbsp;словарь"
        placement="left"
      >
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
      </Tooltip>
    </Toolbar>
  );
}

WordSetPairsToolbar.propTypes = {
  checkedValues: PropTypes.array.isRequired,
  selectionAvailable: PropTypes.bool.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default WordSetPairsToolbar;
