const debounce = (f, delay) => {
  let timerId = null;

  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      f.apply(this, arguments);
      timerId = null;
    }, delay);
  };
};

export default debounce;
