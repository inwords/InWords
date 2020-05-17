import { useRef, useEffect } from 'react';

const usePrevious = value => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
