import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Divider from '@material-ui/core/Divider';
import BrandLink from 'src/components/BrandLink';
import SideNavList from './SideNavList';

const DrawerHeader = styled.div`
  height: 64px;
`;

const DrawerBrandLink = styled(BrandLink)`
  padding-left: 24px;
`;

function DrawerContent({ routes, ...rest }) {
  return (
    <Fragment>
      <DrawerHeader>
        <DrawerBrandLink to="/">InWords</DrawerBrandLink>
      </DrawerHeader>
      <Divider />
      <nav role="navigation">
        <SideNavList routes={routes} {...rest} />
      </nav>
    </Fragment>
  );
}

DrawerContent.propTypes = {
  routes: PropTypes.array.isRequired
};

export default DrawerContent;
