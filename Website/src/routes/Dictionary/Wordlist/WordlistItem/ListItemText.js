import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ListItemTextRoot = styled.div`
  flex: 1 1 auto;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const ListItemTextPrimary = styled.span`
  ${props => props.theme.typography.body2}
  color: ${props => props.theme.palette.text.primary};
`;

const ListItemTextSecondary = styled.span`
  display: block;
  ${props => props.theme.typography.body2}
  color: ${props => props.theme.palette.text.secondary};
`;

function ListItemText({ primary, secondary, ...rest }) {
  return (
    <ListItemTextRoot {...rest}>
      <ListItemTextPrimary>{primary}</ListItemTextPrimary>
      <ListItemTextSecondary>{secondary}</ListItemTextSecondary>
    </ListItemTextRoot>
  );
}

ListItemText.propTypes = {
  primary: PropTypes.string,
  serverId: PropTypes.string
};

export default ListItemText;
