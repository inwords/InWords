import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'src/components/AppBar';

function DynamicAppBar({ children, ...rest }) {
  const [show, setShow] = React.useState(true);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const diff = prevScrollYRef.current - currentScrollY;

      if (diff >= 4 || currentScrollY === 0) {
        if (!show) {
          setShow(true);
        }
      } else if (diff <= -4 && currentScrollY > 64) {
        if (show) {
          setShow(false);
        }
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  return (
    <AppBar show={show} {...rest}>
      {children}
    </AppBar>
  );
}

DynamicAppBar.propTypes = {
  children: PropTypes.node
};

export default DynamicAppBar;
