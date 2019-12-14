import React from 'react';
import { loadValue } from 'src/localStorage';

function withLocalStorageData(WrappedComponent, keys) {
  function WithLocalStorageData({ ...rest }) {
    const [localData, setLocalData] = React.useState({});
    const [actual, setActual] = React.useState(false);

    React.useEffect(() => {
      keys.forEach(key => {
        const value = loadValue(key);
        setLocalData(localData => ({ ...localData, [key]: value || null }));
      });

      setActual(true);
    }, []);

    return actual && <WrappedComponent localData={localData} {...rest} />;
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLocalStorageData.displayName = `withLocalStorageData(${wrappedComponentName})`;

  return WithLocalStorageData;
}

export default withLocalStorageData;
