import React from 'react';

export default function usePopup() {
  const [show, setShow] = React.useState(false);

  const handleToggle = event => {
    event.stopPropagation();
    setShow(show => !show);
  };

  const handleClose = event => {
    event.stopPropagation();
    setShow(false);
  };

  React.useEffect(() => {
    if (show) {
      const handleClose = () => {
        setShow(false);
        window.removeEventListener('click', handleClose);
      };

      window.addEventListener('click', handleClose);
    }
  }, [show]);

  return {
    show,
    setShow,
    handleToggle,
    handleClose
  };
}
