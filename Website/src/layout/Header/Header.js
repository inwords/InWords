import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import NavList from 'src/layout/NavList';
import NavListItem from 'src/layout/NavListItem';
import Drawer from 'src/layout/Drawer';
import Container from 'src/components/Container';
import Button from 'src/components/Button';
import NavBar from 'src/layout/NavBar';

import './header.scss';

const navListItems = [
  <NavListItem to="/dictionary">Словарь</NavListItem>,
  <NavListItem to="/trainings">Обучение</NavListItem>
];

function Header() {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(open => !open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // <header className={classNames('header')}>
    //   <div className="header-content">
    //     <RouterLink to="/" className="header-title">
    //       INWORDS
    //     </RouterLink>
    //     <div className="header-navigation">
    //       <NavList>{navListItems}</NavList>
    //     </div>
    //     <div className="header-mobile-navigation">
    //       <Button onClick={handleToggle} className="header-button">
    //         x
    //       </Button>
    //     </div>
    //   </div>
    //   <div className="header-mobile-navigation">
    //     <Drawer open={open} onClose={handleClose}>
    //       <NavList vertical>{navListItems}</NavList>
    //     </Drawer>
    //   </div>
    // </header>
    <div>
      <header className="header">
        <NavBar handleToggle={handleToggle} />
      </header>
      <Drawer open={open} onClose={handleClose}>
        <NavList vertical>{navListItems}</NavList>
      </Drawer>
    </div>
  );
}

Header.propTypes = {};

export default Header;
