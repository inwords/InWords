import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ListItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 4px;
  padding-right: ${props => (props.hasSecondaryAction ? '56px' : '16px')};
  padding-bottom: 4px;
  padding-left: 16px;
`;

ListItem.propTypes = {
  hasSecondaryAction: PropTypes.bool.isRequired
};

export default ListItem;
