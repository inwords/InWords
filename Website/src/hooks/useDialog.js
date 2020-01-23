import React from 'react';

export default function useDialog(initialState = false) {
  const [open, setOpen] = React.useState(initialState);

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
}
