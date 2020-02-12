import React from 'react';
import PropTypes from 'prop-types';
import usePopup from 'src/hooks/usePopup';
import Icon from 'src/components/Icon';
import IconButton from 'src/components/IconButton';
import PopupContainer from 'src/components/PopupContainer';
import Popup from 'src/components/Popup';
import Menu from 'src/components/Menu';
import MenuItem from 'src/components/MenuItem';

function TrainingSettingsMenuButton({ handleOpen: handeOpenDialog }) {
  const { show, handleOpen, handleClose } = usePopup();

  return (
    <PopupContainer>
      <IconButton
        aria-label="training settings"
        aria-controls="training-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Popup show={show} side="right" onClose={handleClose}>
        <Menu id="training-menu">
          <li>
            <MenuItem
              onClick={() => {
                handeOpenDialog();
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
