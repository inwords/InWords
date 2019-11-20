import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentContainer = styled.main`
  flex-grow: 1;
  padding-top: 88px;
`;

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentContainer;
