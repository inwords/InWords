import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'src/components/core/Icon';
import usePopup from 'src/hooks/usePopup';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import ResponsiveMenu from 'src/components/core/ResponsiveMenu';
import MenuItem from 'src/components/core/MenuItem';
import IconButton from 'src/components/core/IconButton';

function DictionaryMenuButton({ handleLearning }) {
  const { show, handleOpen, handleClose, anchorEl } = usePopup();

  return (
    <PopupContainer>
      <IconButton
        aria-label="dictionary features"
        aria-controls="dictionary-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
        edge="end"
      >
        <Icon>more_horiz</Icon>
      </IconButton>
      <Popup show={show} side="right" onClose={handleClose}>
        <ResponsiveMenu
          id="dictionary-menu"
          anchorEl={anchorEl}
          responsive={show}
        >
          <MenuItem
            component={Link}
            to="/dictionary/training/-1"
            onClick={() => {
              handleLearning();
              handleClose();
            }}
          >
            Изучать
          </MenuItem>
        </ResponsiveMenu>
      </Popup>
    </PopupContainer>
  );
}

DictionaryMenuButton.propTypes = {
  handleLearning: PropTypes.func.isRequired
};

export default DictionaryMenuButton;
