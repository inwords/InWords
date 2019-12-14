import styled from '@emotion/styled';

const LineButton = styled.span`
  display: inline-flex;
  cursor: pointer;
  user-select: none;
  color: ${props => props.theme.palette.primary.main};
  transition: ${props =>
    props.theme.transitions.create('color', {
      duration: props.theme.transitions.duration.shortest
    })};

  &:hover,
  &:active {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export default LineButton;
