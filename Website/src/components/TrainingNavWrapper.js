import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TrainingsNavigation from 'src/components/TrainingsNavigation';

const ContentWrapper = styled.div`
  margin-top: 16px;
`;

function TrainingNavWrapper({ children }) {
  return (
    <Fragment>
      <TrainingsNavigation />
      <ContentWrapper>{children}</ContentWrapper>
    </Fragment>
  );
}

TrainingNavWrapper.propTypes = {
  children: PropTypes.object.isRequired
};

export default TrainingNavWrapper;
