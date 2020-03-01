import React from 'react';
import classNames from 'classnames';

import './Form.css';

function Form({ className, ...rest }) {
  return <form className={classNames('form', className)} {...rest} />;
}

export default Form;
