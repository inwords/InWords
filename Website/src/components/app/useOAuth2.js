import React from 'react';
import useScript from 'src/components/core/useScript';

const useOAuth2 = () => {
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
};

export default useOAuth2;
