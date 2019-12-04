import React, { Fragment } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styled from '@emotion/styled';

const BreadcrumbsRoot = styled.nav`
  margin-bottom: 16px;
  color: ${props => props.theme.palette.text.secondary};
`;

const BreadcrumbsList = styled.ol`
  margin: 0;
  display: flex;
  padding: 0;
  flex-wrap: wrap;
  align-items: center;
`;

const BreadcrumbsListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  list-style-type: none;
`;

const BreadcrumbsSeparator = styled.li`
  display: flex;
  margin-left: 4px;
  user-select: none;
  margin-right: 4px;
`;

function Breadcrumbs({ children }) {
  if (!children) return;

  const separators = Array(React.Children.count(children) - 1).fill(
    <BreadcrumbsSeparator aria-hidden="true">
      <NavigateNextIcon />
    </BreadcrumbsSeparator>
  );

  return (
    <BreadcrumbsRoot>
      <BreadcrumbsList>
        {React.Children.map(children, child => (
          <Fragment>
            <BreadcrumbsListItem>
              {React.cloneElement(child)}
            </BreadcrumbsListItem>
            {separators.pop()}
          </Fragment>
        ))}
      </BreadcrumbsList>
    </BreadcrumbsRoot>
  );
}

export default Breadcrumbs;
