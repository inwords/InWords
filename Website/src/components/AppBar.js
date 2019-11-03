import PropTypes from 'prop-types';
import styled from '@emotion/styled';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Paper from 'src/components/Paper';

const AppBarPaper = styled(Paper)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  width: 100%;
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
`;

function AppBar({ children, ...rest }) {
  return (
    <AppBarPaper elevation={4} {...rest}>
      {children}
    </AppBarPaper>
  );
}

AppBar.propTypes = {
  children: PropTypes.node
};

export default AppBar;
