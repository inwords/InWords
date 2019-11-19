import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'src/components/AppBar';

function InvertedDynamicAppBar({ children, ...rest }) {
  const [show, setShow] = React.useState(false);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const diff = prevScrollYRef.current - currentScrollY;

      if (diff > 1 || currentScrollY === 0) {
        if (show) {
          setShow(false);
        }
      } else if (diff < -1 && currentScrollY > 256) {
        if (!show) {
          setShow(true);
        }
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  return (
    <AppBar as="div" show={show} {...rest}>
      {children}
    </AppBar>
  );
}

InvertedDynamicAppBar.propTypes = {
  children: PropTypes.node
};

export default InvertedDynamicAppBar;
