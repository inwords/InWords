import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Divider from '@material-ui/core/Divider';
import BrandLink from 'src/components/BrandLink';
import NavList from './NavList';

const DrawerBrandLink = styled(BrandLink)`
  padding-left: 24px;
`;

function DrawerContent({ routes, handleClose, ...rest }) {
  return (
    <Fragment>
      <DrawerBrandLink
        onClick={event => {
          event.preventDefault();
          handleClose();
        }}
        to="/"
      >
        InWords
      </DrawerBrandLink>
      <Divider />
      <NavList handleClose={handleClose} routes={routes} {...rest} />
    </Fragment>
  );
}

DrawerContent.propTypes = {
  routes: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default DrawerContent;
