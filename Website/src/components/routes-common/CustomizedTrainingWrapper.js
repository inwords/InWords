import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from 'src/components/core/Paper';
import Toolbar from 'src/components/core/Toolbar';
import Typography from 'src/components/core/Typography';
import Space from 'src/components/core/Space';

function CustomizedTrainingWrapper({
  children,
  title,
  rightToolbarNodes = []
}) {
  return (
    <Fragment>
      <Paper>
        <Toolbar variant="dense">
          <Typography variant="h6">{title}</Typography>
          <Space />
          {rightToolbarNodes}
        </Toolbar>
      </Paper>
      {children}
    </Fragment>
  );
}

CustomizedTrainingWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  rightToolbarNodes: PropTypes.arrayOf(PropTypes.node.isRequired)
};

export default CustomizedTrainingWrapper;
