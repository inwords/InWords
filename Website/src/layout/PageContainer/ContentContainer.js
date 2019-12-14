import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentContainer = styled.main`
  padding-top: 88px;
  flex-grow: 1;

  ${props => props.theme.breakpoints.up('lg')} {
    padding-left: ${props => (props.shift ? '240px' : 0)};
  }
`;

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentContainer;
