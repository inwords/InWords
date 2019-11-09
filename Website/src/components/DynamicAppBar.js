import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AppBar from 'src/components/AppBar';

const PrimaryAppBar = styled(AppBar)`
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
`;

function DynamicAppBar({ children }) {
  const [show, setShow] = React.useState(true);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (prevScrollYRef.current - currentScrollY > 1 || currentScrollY === 0) {
        if (!show) {
          setShow(true);
        }
      } else if (
        prevScrollYRef.current - currentScrollY < -1 &&
        currentScrollY > 64
      ) {
        if (show) {
          setShow(false);
        }
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  return <PrimaryAppBar show={show}>{children}</PrimaryAppBar>;
}

DynamicAppBar.propTypes = {
  children: PropTypes.node
};

export default DynamicAppBar;
