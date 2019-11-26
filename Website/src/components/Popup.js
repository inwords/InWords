import React from 'react';
import styled from '@emotion/styled';
import Paper from 'src/components/Paper';

const PopupPaper = React.forwardRef((props, ref) => {
  return <Paper ref={ref} elevation={8} square {...props} />;
});

const Popup = styled(PopupPaper)`
  position: absolute;
  ${props => {
    switch (props.side) {
      case 'left':
        return 'left: 0';
      case 'right':
        return 'right: 0';
      default:
        return 'left: 0';
    }
  }};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 100ms linear, visibility 100ms linear;
`;

export default Popup;
