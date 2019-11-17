import styled from '@emotion/styled';

const FormPaper = styled.div`
  padding: 24px;
  border-radius: ${props => props.theme.shape.borderRadius}px;
  box-shadow: ${props => props.theme.shadows[1]};
  background-color: ${props => props.theme.palette.background.paper};
`;

export default FormPaper;
