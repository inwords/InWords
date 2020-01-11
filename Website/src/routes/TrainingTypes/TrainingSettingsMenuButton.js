import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import usePopup from 'src/hooks/usePopup';
import IconButton from 'src/components/IconButton';
import PopupContainer from 'src/components/PopupContainer';
import Popup from 'src/components/Popup';
import Menu from 'src/components/Menu';
import MenuItem from 'src/components/MenuItem';

function TrainingSettingsMenuButton({ handleOpen }) {
  const { show, handleToggle, handleClose } = usePopup();

  return (
    <PopupContainer>
      <IconButton
        aria-label="training settings"
        aria-controls="training-menu"
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popup show={show} side="right">
        <Menu id="training-menu">
          <li>
            <MenuItem
              onClick={() => {
                handleOpen();
                handleClose();
              }}
            >
              Настройки
            </MenuItem>
          </li>
        </Menu>
      </Popup>
    </PopupContainer>
  );
}

TrainingSettingsMenuButton.propTypes = {
  handleOpen: PropTypes.func.isRequired
};

export default TrainingSettingsMenuButton;
