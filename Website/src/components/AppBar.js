import styled from '@emotion/styled';

const AppBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  rigth: 0;
  z-index: 999;
  display: flex;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--on-primary);
`;

export default AppBar;
