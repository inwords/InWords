import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useDrawer from 'src/hooks/useDrawer';
import Header from './Header';
import Drawers from './Drawers/Drawers';
import ContentWrapper from './ContentWrapper';

const Wrapper = styled.div`
  display: flex;
`;

function PageWrapper({ mainRoutes, sideRoutes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <Wrapper>
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
      <ContentWrapper shift={Boolean(mainRoutes)}>{children}</ContentWrapper>
    </Wrapper>
  );
}

PageWrapper.propTypes = {
  sideRoutes: PropTypes.array,
  mainRoutes: PropTypes.array,
  children: PropTypes.node
};

export default PageWrapper;
