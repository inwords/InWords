import React from 'react';

function useScrollShow(initialState = true, scrollTop = 0, inverse = false) {
  const [show, setShow] = React.useState(initialState);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (prevScrollYRef.current - currentScrollY > 3 || currentScrollY === 0) {
        if (!inverse ? !show : show) {
          setShow(!inverse);
        }
      } else if (
        prevScrollYRef.current - currentScrollY < -3 &&
        currentScrollY > scrollTop
      ) {
        if (!inverse ? show : !show) {
          setShow(inverse);
        }
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [show, scrollTop, inverse]);

  return show;
}

export default useScrollShow;
