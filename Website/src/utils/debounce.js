const debounce = (f, ms) => {
  let isReady = true;

  return function () {
    if (!isReady) return;

    f.apply(this, arguments);

    isReady = false;

    setTimeout(() => {
      isReady = true;
    }, ms);
  };
};

export default debounce;
