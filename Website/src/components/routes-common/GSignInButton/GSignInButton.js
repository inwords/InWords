import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import createScriptsLoader from 'src/utils/createScriptsLoader';

import './GSignInButton.css';

function GSignInButton({ handleSuccess, handleFailure }) {
  useEffect(() => {
    const handleLoad = () => {
      window.gapi.signin2.render('g-signin2', {
        scope: 'profile email',
        width: '120%',
        height: 40,
        longtitle: true,
        theme: 'light',
        onsuccess: handleSuccess,
        onfailure: handleFailure
      });
    };

    const { load, cleanUp } = createScriptsLoader();
    if (!window.gapi || !window.gapi.signin2) {
      (async () => {
        await load({
          src: 'https://apis.google.com/js/platform.js',
          defer: true
        });
        handleLoad();
      })();
    } else {
      handleLoad();
    }

    return () => {
      cleanUp();
    };
  }, [handleSuccess, handleFailure]);

  return <div id="g-signin2" className="g-signin2"></div>;
}

GSignInButton.propTypes = {
  handleSuccess: PropTypes.func,
  handleFailure: PropTypes.func
};

export default memo(GSignInButton);
