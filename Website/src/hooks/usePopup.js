import React from 'react';

const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

export default function usePopup() {
  const [show, setShow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleToggle = event => {
    setShow(show => !show);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (!anchorEl.contains(event.target)) {
      setShow(false);
      setAnchorEl(null);
    }
  };

  React.useEffect(() => {
    if (show) {
      window.addEventListener(touchEvent, handleClose);

      return () => {
        window.removeEventListener(touchEvent, handleClose);
      };
    }
  }, [show]);

  return {
    show,
    setShow,
    handleToggle,
    handleClose,
    anchorEl
  };
}
