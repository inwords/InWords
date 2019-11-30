import PropTypes from 'prop-types';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

const Backdrop = styled('div', {
  shouldForwardProp: prop => isPropValid(prop) && prop !== 'open'
})`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: ${props => (props.open ? 1 : 0)};
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.5);
  transition-property: opacity;
  transition-duration: ${props => props.transitionDuration || 1}ms;
  transition-timing-function: linear;

  ${props =>
    props.preAnimated &&
    props.open &&
    `@keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    animation: fadeIn ${props.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1);
  `}
`;

Backdrop.propTypes = {
  preAnimated: PropTypes.bool,
  open: PropTypes.bool
};

export default Backdrop;
