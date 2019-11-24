import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

const Paper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'elevation'
})`
  border-radius: ${props =>
    props.square ? 0 : props.theme.shape.borderRadius}px;
  box-shadow: ${props => props.theme.shadows[props.elevation || 1]};
  background-color: ${props => props.theme.palette.background.paper};
`;

Paper.propTypes = {
  elevation: PropTypes.number,
  square: PropTypes.bool
};

export default Paper;
