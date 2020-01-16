import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import usePopup from 'src/hooks/usePopup';
import PopupContainer from 'src/components/PopupContainer';
import Popup from 'src/components/Popup';
import ResponsiveMenu from 'src/components/ResponsiveMenu';
import MenuItem from 'src/components/MenuItem';
import IconButton from 'src/components/IconButton';

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
        <MoreVertIcon />
      </IconButton>
      <Popup show={show} side="right" onClose={handleClose}>
        <ResponsiveMenu
          id="dictionary-menu"
          anchorEl={anchorEl}
          responsive={show}
        >
          <MenuItem
            component={Link}
            to="/training/dictionary"
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
