import { useEffect } from 'react';
import createScriptsLoader from 'src/utils/createScriptsLoader';

const handleLoad = () => {
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
};

const useOAuth2 = () => {
  useEffect(() => {
    const { load, cleanUp } = createScriptsLoader();
    if (!window.gapi || !window.gapi.auth2) {
      (async () => {
        await load({
          src: 'https://apis.google.com/js/api.js',
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
  }, []);
};

export default useOAuth2;
