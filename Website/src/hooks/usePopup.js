import React from 'react';

export default function usePopup() {
  const [show, setShow] = React.useState(false);

  const handleToggle = event => {
    event.stopPropagation();
    setShow(show => !show);
  };

  const handleClose = () => {
    setShow(false);
  };

  React.useEffect(() => {
    if (show) {
      const handleClose = () => {
        setShow(false);
      };

      window.addEventListener('click', handleClose);

      return () => {
        window.removeEventListener('click', handleClose);
      };
    }
  }, [show]);

  return {
    show,
    setShow,
    handleToggle,
    handleClose
  };
}
