import React from 'react';

const usePopup = () => {
  const [show, setShow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = event => {
    setShow(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    handleOpen,
    handleClose,
    anchorEl
  };
};

export default usePopup;
