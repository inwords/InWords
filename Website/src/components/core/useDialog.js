import { useState } from 'react';

const useDialog = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleOpen,
    handleClose
  };
};

export default useDialog;
