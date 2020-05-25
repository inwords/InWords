import React from 'react';
import Typography from 'src/components/core/Typography';

function NotFound() {
  return (
    <Typography component="h1" variant="h4" align="center">
      Страница не найдена{' '}
      <span role="img" aria-label="смущенное лицо">
        &#128533;
      </span>
    </Typography>
  );
}

export default NotFound;
