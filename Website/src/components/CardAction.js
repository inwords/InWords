import styled from '@emotion/styled';

const CardAction = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.palette.primary.main};

  &:hover,
  &:active {
    text-decoration: underline;
  }

  ${props => props.theme.typography['body1']}
`;

export default CardAction;
