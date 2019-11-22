import styled from '@emotion/styled';
import ListItem from 'src/components/ListItem';

const ListItemButton = styled(ListItem)`
  cursor: pointer;
  user-select: none;
  transition: ${props =>
    props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

export default ListItemButton;
