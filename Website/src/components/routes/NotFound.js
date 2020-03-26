import React from 'react';
import Container from 'src/components/core/Container';
import Typography from 'src/components/core/Typography';

function NotFound() {
  return (
    <Container component="div" maxWidth="sm">
      <Typography component="h1" variant="h4">
        Страница не найдена{' '}
        <span role="img" aria-label="confused-face">
          &#128533;
        </span>
      </Typography>
    </Container>
  );
}

export default NotFound;
