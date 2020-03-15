import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Space from 'src/components/core/Space';

function WordSetToolbar({
  checkedValues,
  handleReset,
  handleCheckAll,
  handleAdding
}) {
  const numberOfChecked = checkedValues.length;

  return (
    <Toolbar>
      <IconButton
        aria-label="clear selection"
        onClick={handleReset}
        color="inherit"
        edge="start"
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
        disabled={numberOfChecked === 0}
        onClick={() => {
          handleAdding();
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

WordSetToolbar.propTypes = {
  checkedValues: PropTypes.array.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  handleAdding: PropTypes.func.isRequired
};

export default WordSetToolbar;
