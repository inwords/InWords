import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Form.css';

function Form({ className, ...rest }) {
  return <form className={classNames('form', className)} {...rest} />;
}

Form.propTypes = {
  className: PropTypes.string
};

export default Form;
