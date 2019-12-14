import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

const Paper = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'elevation'
})`
  box-shadow: ${props => props.theme.shadows[props.elevation || 1]};
  background-color: ${props => props.theme.palette.background.paper};
`;

Paper.propTypes = {
  elevation: PropTypes.number
};

export default Paper;
