import styled from '@emotion/styled';

const DialogContentText = styled.div`
  margin-bottom: 12px;
  ${props => props.theme.typography.body1}
  color: ${props => props.theme.palette.text.secondary};
`;

export default DialogContentText;
