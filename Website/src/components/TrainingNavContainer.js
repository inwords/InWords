import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TrainingNavigation from 'src/components/TrainingNavigation';

const ContentContainer = styled.div`
  margin-top: 16px;
`;

function TrainingNavContainer({ children }) {
  return (
    <Fragment>
      <TrainingNavigation />
      <ContentContainer>{children}</ContentContainer>
    </Fragment>
  );
}

TrainingNavContainer.propTypes = {
  children: PropTypes.object.isRequired
};

export default TrainingNavContainer;
