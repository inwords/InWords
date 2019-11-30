import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import useDrawer from 'src/hooks/useDrawer';
import Header from './Header';
import ContentContainer from './ContentContainer';
import SideNavList from './SideNavList';
import Drawer from 'src/components/Drawer';
import DrawerContent from './DrawerContent';

const Container = styled.div`
  display: flex;
`;

const SideNavContainer = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: auto;
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
        <Drawer role="navigation" open={open} onClose={handleClose}>
          <DrawerContent handleClose={handleClose} routes={routes} />
        </Drawer>
      )}
      {nestedRoutes && (
        <SideNavContainer>
          <SideNavList routes={nestedRoutes} />
        </SideNavContainer>
      )}
      <ContentContainer shift={Boolean(nestedRoutes)}>
        {children}
      </ContentContainer>
    </Container>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
