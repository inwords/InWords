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

function PageContainer({ mainRoutes, sideRoutes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <Container>
      <Header
        mainRoutes={mainRoutes}
        rightNodes={rightNodes}
        handleOpenDrawer={sideRoutes && handleOpen}
      />
      {sideRoutes && (
        <Drawers
          sideRoutes={sideRoutes}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      <ContentContainer shift={Boolean(mainRoutes)}>
        {children}
      </ContentContainer>
    </Container>
  );
}

PageContainer.propTypes = {
  sideRoutes: PropTypes.array,
  mainRoutes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
