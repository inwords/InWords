import React from 'react';
import Header from './Header';

function HeaderContainer(props) {
  const [show, setShow] = React.useState(true);
  const prevScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (prevScrollYRef.current - currentScrollY > 3 || currentScrollY === 0) {
        if (!show) {
          setShow(true);
        }
      } else if (prevScrollYRef.current - currentScrollY < -3) {
        if (show && currentScrollY > 64) {
          setShow(false);
        }
      }

      prevScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  return <Header show={show} {...props} />;
}

export default HeaderContainer;
