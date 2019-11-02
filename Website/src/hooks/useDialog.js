import React from 'react';

export default function useDialog() {
  const [open, setOpen] = React.useState(false);

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
