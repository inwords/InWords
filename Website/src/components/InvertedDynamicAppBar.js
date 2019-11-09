import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AppBar from 'src/components/AppBar';

const DefaultAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.background.paper};
`;

function InvertedDynamicAppBar({ children }) {
  const [show, setShow] = React.useState(false);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (prevScrollYRef.current - currentScrollY > 1 || currentScrollY === 0) {
        if (show) {
          setShow(false);
        }
      } else if (
        prevScrollYRef.current - currentScrollY < -1 &&
        currentScrollY > 256
      ) {
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
    <DefaultAppBar as="div" show={show}>
      {children}
    </DefaultAppBar>
  );
}

InvertedDynamicAppBar.propTypes = {
  children: PropTypes.node
};

export default InvertedDynamicAppBar;
