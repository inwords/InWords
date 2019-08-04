import { useState, useCallback } from 'react';

function useDrawer() {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  return {
    open,
    handleOpen,
    handleClose,
    handleToggle,
  };
}

export default useDrawer;
