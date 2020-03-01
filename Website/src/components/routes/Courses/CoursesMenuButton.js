import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addCategoryWordsToDictionary } from 'src/actions/trainingApiActions';
import usePopup from 'src/hooks/usePopup';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import Menu from 'src/components/core/Menu';
import MenuItem from 'src/components/core/MenuItem';

function CoursesMenuButton({ gameId }) {
  const { show, handleOpen, handleClose } = usePopup();

  const dispatch = useDispatch();

  const handleAddingInDictionary = () => {
    dispatch(addCategoryWordsToDictionary(gameId));
  };

  return (
    <PopupContainer>
      <IconButton
        aria-label="word sets menu"
        aria-controls="word-sets-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Popup show={show} side="right" onClose={handleClose}>
        <Menu id="word-sets-menu">
          <li>
            <MenuItem
              onClick={() => {
                handleAddingInDictionary();
                handleClose();
              }}
            >
              Добавить в словарь
            </MenuItem>
          </li>
        </Menu>
      </Popup>
    </PopupContainer>
  );
}

CoursesMenuButton.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default CoursesMenuButton;
