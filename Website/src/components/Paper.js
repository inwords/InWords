import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

const Paper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'elevation'
})`
  background-color: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.primary};
  box-shadow: ${props => props.theme.shadows[props.elevation || 0]};
`;

export default Paper;
