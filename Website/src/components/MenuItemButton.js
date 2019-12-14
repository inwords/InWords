import styled from '@emotion/styled';
import ListItemButtonBase from 'src/components/ListItemButtonBase';

const MenuItemButton = styled(ListItemButtonBase)`
  height: 36px;
  padding: 0 16px;
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

export default MenuItemButton;
