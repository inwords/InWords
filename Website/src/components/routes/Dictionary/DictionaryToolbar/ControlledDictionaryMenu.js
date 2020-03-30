import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeWordSetLevel } from 'src/actions/wordSetActions';
import usePopup from 'src/components/core/usePopup';
import PopupContainer from 'src/components/core/PopupContainer';
import Popup from 'src/components/core/Popup';
import ResponsiveMenu from 'src/components/core/ResponsiveMenu';
import MenuItem from 'src/components/core/MenuItem';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';

function ControlledDictionaryMenu({ checkedValues }) {
  const { wordPairs } = useSelector(store => store.dictionary);

  const dispatch = useDispatch();
  const handleLearning = () => {
    dispatch(
      initializeWordSetLevel({
        levelId: -1,
        wordTranslations: wordPairs.filter(({ serverId }) =>
          checkedValues.includes(serverId)
        )
      })
    );
  };

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

ControlledDictionaryMenu.propTypes = {
  checkedValues: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default ControlledDictionaryMenu;
