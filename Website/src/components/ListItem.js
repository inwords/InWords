import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ListItem = styled.li`
  position: relative;
`;

ListItem.propTypes = {
  hasSecondaryAction: PropTypes.bool.isRequired
};

export default ListItem;
