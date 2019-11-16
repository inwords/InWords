import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const BreadcrumbsWrapper = styled.div`
  padding: 8px 16px;
  background-color: ${props => props.theme.palette.background.paper};
`;

function InternalNavigation({ children }) {
  return (
    <BreadcrumbsWrapper>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {children}
      </Breadcrumbs>
    </BreadcrumbsWrapper>
  );
}

InternalNavigation.propTypes = {
  children: PropTypes.node.isRequired
};

export default InternalNavigation;
