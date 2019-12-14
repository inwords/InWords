import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from 'src/components/IconButton';
import BrandLink from 'src/layout/BrandLink';
import AppBar from 'src/components/AppBar';
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

  ${props => props.theme.breakpoints.down('md')} {
    display: none;
  }
`;

const ContextBlock = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const RightContextBlock = styled(ContextBlock)`
  margin-left: 24px;

  ${props => props.theme.breakpoints.down('md')} {
    margin-left: auto;
  }
`;

function Header({ routes, rightNodes, handleOpenDrawer }) {
  return (
    <AppBar>
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
          <BrandLink to="/">InWords</BrandLink>
        </ContextBlock>
        {routes && (
          <Nav role="navigation">
            <MainMavList routes={routes} />
          </Nav>
        )}
        {rightNodes && <RightContextBlock>{rightNodes}</RightContextBlock>}
      </Context>
      <Progress />
    </AppBar>
  );
}

Header.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ),
  rightNodes: PropTypes.arrayOf(PropTypes.node.isRequired),
  handleOpenDrawer: PropTypes.func
};

export default Header;
