import styled from '@emotion/styled';

const CardTitle = styled.span`
  margin: 0 0 16px;
  display: flex;
  align-items: center;

  ${props => props.theme.typography['h5']}
`;

export default CardTitle;
