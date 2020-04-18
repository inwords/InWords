const createScriptsLoader = () => {
  const scripts = [];

  return {
    load: ({ src, async = false, defer = false }) =>
      new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        script.defer = defer;
        script.onload = resolve;
        script.onerror = reject;

        scripts.push(script);

        document.body.appendChild(script);
      }),
    cleanUp: () => {
      scripts.forEach(script => {
        document.body.removeChild(script);
      });
    }
  };
};

export default createScriptsLoader;
