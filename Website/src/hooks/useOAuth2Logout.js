import React from 'react';
import useScript from 'src/hooks/useScript';

const useOAuth2Logout = () => {
  const handleOAuth2Logout = async () => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        await auth2.signOut();
        auth2.disconnect();
      }
    }
  };

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

  return { handleOAuth2Logout };
};

export default useOAuth2Logout;
