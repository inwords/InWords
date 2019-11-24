import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ContentContainer = styled.div`
  flex-grow: 1;
`;

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContentContainer;
