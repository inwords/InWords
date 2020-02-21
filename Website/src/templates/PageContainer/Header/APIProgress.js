import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from 'src/components/LinearProgress';

function APIProgress() {
  const loading = useSelector(store => store.common.loading);

  return loading && <LinearProgress />;
}

export default APIProgress;
