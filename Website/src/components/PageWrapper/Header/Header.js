import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BrandLink from 'src/components/BrandLink';
import DynamicAppBar from 'src/components/DynamicAppBar';
import MainMavList from './MainNavList';
import Progress from './Progress';

const Context = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: ${props => props.theme.spacing(0, 3)};
`;

const NavMenuButton = styled(IconButton)`
  margin-right: 16px;
  ${props => props.theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  display: flex;
  overflow: hidden;
  height: 64px;
  ${props => props.theme.breakpoints.down('xs')} {
    order: 1;
    width: 100%;
    height: 48px;
  }
`;

const ContextBlock = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const RightContextBlock = styled(ContextBlock)`
  margin-left: 24px;
  ${props => props.theme.breakpoints.down('xs')} {
    margin-left: auto;
  }
`;

function Header({ mainRoutes, rightNodes, handleOpenDrawer }) {
  return (
    <DynamicAppBar component="header" primary>
      <Context>
        <ContextBlock>
          {handleOpenDrawer && (
            <NavMenuButton
              aria-label="side-nav-menu"
              onClick={handleOpenDrawer}
              edge="start"
              color="inherit"
            >
              <MenuIcon />
            </NavMenuButton>
          )}
          <BrandLink />
        </ContextBlock>
        {mainRoutes && (
          <Nav role="navigation">
            <MainMavList mainRoutes={mainRoutes} />
          </Nav>
        )}
        {rightNodes && <RightContextBlock>{rightNodes}</RightContextBlock>}
      </Context>
      <Progress />
    </DynamicAppBar>
  );
}

Header.propTypes = {
  mainRoutes: PropTypes.arrayOf(
    PropTypes.exact({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
