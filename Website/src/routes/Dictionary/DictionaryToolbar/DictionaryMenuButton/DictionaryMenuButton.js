import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMenu from 'src/hooks/useMenu';

function DictionaryMenuButton({ disabled, handleLearning }) {
  const { anchorEl, handleClick, handleClose } = useMenu();

  return (
    <div>
      <IconButton
        aria-label="dictionary features"
        aria-controls="dictionary-menu"
        aria-haspopup="true"
        disabled={disabled}
        onClick={handleClick}
        edge="end"
        color="inherit"
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
          to="/trainings/0"
          onClick={() => {
            handleLearning();
            handleClose();
          }}
        >
          Изучение
        </MenuItem>
      </Menu>
    </div>
  );
}

DictionaryMenuButton.propTypes = {
  handleLearning: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default DictionaryMenuButton;
