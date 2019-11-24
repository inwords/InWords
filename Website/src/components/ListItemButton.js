import React from 'react';
import styled from '@emotion/styled';
import ListItem from 'src/components/ListItem';

const ListItemButtonRoot = styled(ListItem)`
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: ${props => props.theme.palette.text.primary};
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
