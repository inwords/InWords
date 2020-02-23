import React from 'react';
import PropTypes from 'prop-types';
import usePopup from 'src/hooks/usePopup';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import Menu from 'src/components/core/Menu';
import MenuItem from 'src/components/core/MenuItem';

function TrainingSettingsMenuButton({ handleOpen: handeOpenDialog }) {
  const { show, handleOpen, handleClose } = usePopup();

  return (
    <PopupContainer>
      <IconButton
        aria-label="training menu"
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
