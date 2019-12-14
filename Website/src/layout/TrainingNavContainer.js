import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TrainingNavigation from 'src/layout/TrainingNavigation';

function TrainingNavContainer({ children }) {
  return (
    <Fragment>
      <TrainingNavigation />
      <div>{children}</div>
    </Fragment>
  );
}

TrainingNavContainer.propTypes = {
  children: PropTypes.object.isRequired
};

export default TrainingNavContainer;
