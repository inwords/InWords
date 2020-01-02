import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

function Progress() {
  const loading = useSelector(store => store.common.loading);

  return loading && <LinearProgress />;
}

export default Progress;
