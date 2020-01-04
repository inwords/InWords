import { useState, useEffect } from 'react';
import debounce from 'src/utils/debounce';

function useMaxHeight(anchorEl) {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (anchorEl) {
      const rect = anchorEl.getBoundingClientRect();
      setMaxHeight(window.innerHeight - rect.top - rect.height);

      const handleResize = debounce(() => {
        setMaxHeight(window.innerHeight - rect.top - rect.height);
      }, 100);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [anchorEl]);

  return maxHeight;
}

export default useMaxHeight;
