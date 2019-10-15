import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Paper from 'src/components/Paper';
import Link from 'src/components/Link';
import NavList from 'src/layout/NavList';
import Drawer from 'src/layout/Drawer';
import Container from 'src/components/Container';
import Button from 'src/components/Button';

import './header.scss';

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
    <header className={classNames('header')}>
      <Container className="header-content">
        <Link
          variant="h5"
          component={RouterLink}
          to="/"
          className="header-title"
        >
          INWORDS
        </Link>
        <div className="header-navigation">
          <NavList />
        </div>
        <div className="header-mobile-navigation">
          <Button onClick={handleToggle} className="header-button">
            x
          </Button>
        </div>
      </Container>
      <div className="header-mobile-navigation">
        <Drawer open={open} onClose={handleClose}>
          <NavList vertical />
        </Drawer>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
