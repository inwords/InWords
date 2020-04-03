import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import List from 'src/components/core/List';

const PADDING_SIZE = 80;

const InnerList = forwardRef(function InnerList({ style, ...rest }, ref) {
  return (
    <List
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + PADDING_SIZE}px`
      }}
      {...rest}
    />
  );
});

InnerList.propTypes = {
  style: PropTypes.shape({
    height: PropTypes.number.isRequired
  }).isRequired
};

export default InnerList;
