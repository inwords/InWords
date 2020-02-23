import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import usePopup from 'src/hooks/usePopup';
import Icon from 'src/components/core/Icon';
import IconButton from 'src/components/core/IconButton';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import Menu from 'src/components/core/Menu';
import MenuItem from 'src/components/core/MenuItem';

function WordSetsMenuButton({ gameId }) {
  const { show, handleOpen, handleClose } = usePopup();

  const match = useRouteMatch();

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
              component={Link}
              to={`${match.url}/training/${gameId}`}
              onClick={handleClose}
            >
              Демо-обучение
            </MenuItem>
          </li>
        </Menu>
      </Popup>
    </PopupContainer>
  );
}

WordSetsMenuButton.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default WordSetsMenuButton;
