import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useDrawer from 'src/hooks/useDrawer';
import Header from './Header';
import Drawers from './Drawers/Drawers';
import ContentContainer from './ContentContainer';

const Container = styled.div`
  display: flex;
`;

function PageContainer({ routes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <Container>
      <Header
        routes={routes}
        rightNodes={rightNodes}
        handleOpenDrawer={routes && handleOpen}
      />
      <Drawers
        routes={routes}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
