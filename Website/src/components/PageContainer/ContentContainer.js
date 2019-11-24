import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentContainer = styled.main`
  padding-top: 88px;
  flex-grow: 1;
`;

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentContainer;
