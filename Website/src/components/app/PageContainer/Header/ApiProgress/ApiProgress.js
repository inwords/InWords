import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from 'src/components/core/LinearProgress';

import './ApiProgress.css';

function ApiProgress() {
  const loading = useSelector(store => store.common.loading);

  return loading && <LinearProgress className="api-progress" />;
}

export default ApiProgress;
