import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

usePrevious.propTypes = {
  value: PropTypes.any.isRequired
};
