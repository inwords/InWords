import styled from '@emotion/styled';

const Card = styled.div`
  width: auto;
  border-radius: 2px;
  box-shadow: ${props => props.theme.shadows[1]};
  background-color: ${props => props.theme.palette.background.paper};
`;

export default Card;
