import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Paper = styled.div`
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
