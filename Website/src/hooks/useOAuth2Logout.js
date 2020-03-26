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

  return { handleOAuth2Logout };
};

export default useOAuth2Logout;
