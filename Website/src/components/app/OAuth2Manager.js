import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createScriptsLoader from 'src/utils/createScriptsLoader';

export const OAuth2Context = createContext({
  initialized: false
});

const handleLoad = setInitialized => {
  const params = {
    client_id: process.env.WEB_CLIENT_ID
  };

  window.gapi.load('auth2', async () => {
    if (!window.gapi.auth2.getAuthInstance()) {
      try {
        await window.gapi.auth2.init(params);
        setInitialized(true);
      } catch (error) {
        // die
      }
    }
  });
};

function OAuth2Manager({ children }) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const { load, cleanUp } = createScriptsLoader();
    if (!window.gapi || !window.gapi.auth2) {
      (async () => {
        await load({
          src: 'https://apis.google.com/js/api.js',
          defer: true
        });
        handleLoad(setInitialized);
      })();
    } else {
      handleLoad(setInitialized);
    }

    return () => {
      cleanUp();
    };
  }, []);

  return (
    <OAuth2Context.Provider value={{ initialized }}>
      {children}
    </OAuth2Context.Provider>
  );
}

OAuth2Manager.propTypes = {
  children: PropTypes.node
};

export default OAuth2Manager;
