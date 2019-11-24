import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
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
  ${props => props.theme.breakpoints.down('md')} {
    display: none;
  }
`;

function getNestedRoutes(routes, url) {
  const route = routes && routes.find(({ to }) => url.startsWith(to));
  return route && route.nestedRoutes;
}

function PageContainer({ routes, rightNodes, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  const { url } = useRouteMatch();

  const nestedRoutes = getNestedRoutes(routes, url);

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
      {nestedRoutes && (
        <SideNavContainer>
          <SideNavList routes={nestedRoutes} />
        </SideNavContainer>
      )}
      <ContentContainer as="main">{children}</ContentContainer>
    </Container>
  );
}

PageContainer.propTypes = {
  routes: PropTypes.array,
  children: PropTypes.node
};

export default PageContainer;
