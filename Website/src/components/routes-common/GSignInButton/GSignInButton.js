import React from 'react';
import PropTypes from 'prop-types';
import useScript from 'src/components/core/useScript';

import './GSignInButton.css';

function GSignInButton({ handleSuccess, handleFailure }) {
  useScript(
    'https://apis.google.com/js/platform.js?onload=renderButton',
    () => {
      window.gapi.signin2.render('g-signin2', {
        scope: 'profile email',
        width: '120%',
        height: 40,
        longtitle: true,
        theme: 'light',
        onsuccess: handleSuccess,
        onfailure: handleFailure
      });
    }
  );

  return <div id="g-signin2" className="g-signin2"></div>;
}

GSignInButton.propTypes = {
  handleSuccess: PropTypes.func,
  handleFailure: PropTypes.func
};

export default React.memo(GSignInButton);
