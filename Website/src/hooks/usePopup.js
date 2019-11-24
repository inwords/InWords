import React from 'react';

export default function usePopup() {
  const [show, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(show => !show);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClose = () => {
      if (show) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handleClose);

    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, [show]);

  return {
    show,
    setOpen,
    handleToggle,
    handleClose
  };
}
