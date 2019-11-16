import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMenu from 'src/hooks/useMenu';

function CategoryMenuButton({ handleAddingInDictionary }) {
  const { anchorEl, handleClick, handleClose } = useMenu();

  return (
    <Fragment>
      <IconButton
        aria-label="category features"
        aria-controls="category-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleAddingInDictionary();
            handleClose();
          }}
        >
          Добавить в словарь
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

CategoryMenuButton.propTypes = {
  handleAddingInDictionary: PropTypes.func.isRequired
};

export default CategoryMenuButton;
