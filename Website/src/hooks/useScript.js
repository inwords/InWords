import React from 'react';

const useScript = (url, onLoad) => {
  React.useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.onload = onLoad;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, onLoad]);
};

export default useScript;
