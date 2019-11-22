import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from 'src/components/IconButton';
import useMenu from 'src/hooks/useMenu';

function DictionaryMenuButton({ handleLearning }) {
  const { anchorEl, handleClick, handleClose } = useMenu();

  return (
    <Fragment>
      <IconButton
        aria-label="dictionary features"
        aria-controls="dictionary-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        edge="end"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="dictionary-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          component={Link}
          to="/training/0"
          onClick={() => {
            handleLearning();
            handleClose();
          }}
        >
          Изучать
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

DictionaryMenuButton.propTypes = {
  handleLearning: PropTypes.func.isRequired
};

export default DictionaryMenuButton;
