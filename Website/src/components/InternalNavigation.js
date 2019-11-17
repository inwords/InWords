import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const BreadcrumbsContainer = styled.div`
  padding: 8px 16px;
  background-color: ${props => props.theme.palette.background.paper};
`;

function InternalNavigation({ children }) {
  return (
    <BreadcrumbsContainer>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {children}
      </Breadcrumbs>
    </BreadcrumbsContainer>
  );
}

InternalNavigation.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalNavigation;
