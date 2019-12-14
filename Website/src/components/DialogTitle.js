import React from 'react';
import styled from '@emotion/styled';
import Typography from 'src/components/Typography';

const DialogTitleRoot = styled.div`
  margin: 0;
  flex: 0 0 auto;
  padding: 16px 24px;
`;

function DialogTitle({ children, ...rest }) {
  return (
    <DialogTitleRoot {...rest}>
      <Typography as="h2" variant="h6">
        {children}
      </Typography>
    </DialogTitleRoot>
  );
}

export default DialogTitle;
