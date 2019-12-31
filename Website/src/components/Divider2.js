import styled from '@emotion/styled';

const Divider = styled.hr`
  margin: 0;
  height: 1px;
  border: none;
  background-color: ${props => props.theme.palette.divider};
`;

export default Divider;
