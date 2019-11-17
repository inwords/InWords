import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentContainer = styled.main`
  flex-grow: 1;
  padding-top: 88px;
  ${props =>
    props.shift &&
    `${props.theme.breakpoints.down('xs')} {
      padding-top: 136px;
    }`}
`;

ContentContainer.propTypes = {
  shift: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ContentContainer;
