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

function DrawerContent({ sideRoutes }) {
  return (
    <Fragment>
      <DrawerHeader>
        <DrawerBrandLink />
      </DrawerHeader>
      <Divider />
      <nav role="navigation">
        <SideNavList sideRoutes={sideRoutes} />
      </nav>
    </Fragment>
  );
}

DrawerContent.propTypes = {
  sideRoutes: PropTypes.array.isRequired
};

export default DrawerContent;
