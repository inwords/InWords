import React from 'react';
import PropTypes from 'prop-types';
import useScript from 'src/hooks/useScript';

import './GSignInButton.css';

function GSignInButton({ handleSuccess, handleFailure }) {
  useScript(
    'https://apis.google.com/js/api.js',
    React.useCallback(() => {
      const params = {
        client_id: process.env.WEB_CLIENT_ID
      };

      window.gapi.load('auth2', async () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          try {
            await window.gapi.auth2.init(params);
          } catch (error) {
            // die
          }
        }
      });
    }, [])
  );

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
