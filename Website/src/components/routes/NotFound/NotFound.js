import React from 'react';
import Typography from 'src/components/core/Typography';

import './NotFound.css';

function NotFound() {
  return (
    <Typography component="h1" variant="h4" className="not-found-text">
      Страница не найдена{' '}
      <span role="img" aria-label="confused-face">
        &#128533;
      </span>
    </Typography>
  );
}

export default NotFound;
