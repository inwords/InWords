import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function Header() {
  return (
   <AppBar position="fixed">
     <Toolbar>

     </Toolbar>
   </AppBar>
  );
}

Header.propTypes = {};

export default Header;
