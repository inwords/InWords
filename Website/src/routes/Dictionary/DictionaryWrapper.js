import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

function WordlistWrapper({ children }) {
  return (
    <Container component="div" maxWidth="md">
      <Paper>
        {children}
      </Paper>
    </Container>
  );
}

WordlistWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default WordlistWrapper;
