import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TrainingsNavigation from 'src/components/TrainingsNavigation';

const ContentContainer = styled.div`
  margin-top: 16px;
`;

function TrainingNavContainer({ children }) {
  return (
    <Fragment>
      <TrainingsNavigation />
      <ContentContainer>{children}</ContentContainer>
    </Fragment>
  );
}

TrainingNavContainer.propTypes = {
  children: PropTypes.object.isRequired
};

export default TrainingNavContainer;
