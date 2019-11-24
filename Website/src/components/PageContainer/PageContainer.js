import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import useDrawer from 'src/hooks/useDrawer';
import Header from './Header';
import Drawers from './Drawers/Drawers';
import ContentContainer from './ContentContainer';
import SideNavList from './SideNavList';

const Container = styled.div`
  display: flex;
`;

const SideNavContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 240px;
  padding-top: 88px;
  border-right: 1px solid ${props => props.theme.palette.divider};
  background-color: ${props => props.theme.palette.background.paper};

  ${props => props.theme.breakpoints.down('md')} {
    display: none;
  }
`;

function getNestedRoutes(routes, pathname) {
  const route = routes && routes.find(({ to }) => pathname.startsWith(to));
  return route && route.nestedRoutes;
}

function PageContainer({ routes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  const { pathname } = useLocation();

  const nestedRoutes = getNestedRoutes(routes, pathname);

  return (
    <Container>
      <Header
        routes={routes}
        rightNodes={rightNodes}
        handleOpenDrawer={routes && handleOpen}
      />
      {routes && (
        <Drawers
          routes={routes}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      {nestedRoutes && (
        <SideNavContainer>
          <SideNavList routes={nestedRoutes} />
        </SideNavContainer>
      )}
      <ContentContainer shift>{children}</ContentContainer>
    </Container>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
