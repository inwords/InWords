import React from 'react';
import styled from '@emotion/styled';
import ListItemButtonBase from 'src/components/ListItemButtonBase';

const ListItemButtonRoot = styled(ListItemButtonBase)`
  padding-top: 4px;
  padding-right: ${props => (props.hasSecondaryAction ? '56px' : '16px')};
  padding-bottom: 4px;
  padding-left: 16px;
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

const ListItemButton = React.forwardRef((props, ref) => (
  <ListItemButtonRoot ref={ref} role="button" {...props} />
));

export default ListItemButton;
