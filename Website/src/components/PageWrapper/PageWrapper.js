import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useDrawer from 'src/hooks/useDrawer';
import Header from './Header';
import Drawers from './Drawers/Drawers';
import ContentWrapper from './ContentWrapper';
import ProfileMenuButton from './ProfileMenuButton';

const mainRoutes = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/trainings',
    text: 'Обучение'
  }
];

const Wrapper = styled.div`
  display: flex;
`;

function PageWrapper({ sideRoutes, authorized = false, children }) {
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <Wrapper>
      <Header
        mainRoutes={authorized ? mainRoutes : undefined}
        rightNodes={authorized ? [<ProfileMenuButton key={0} />] : undefined}
        handleOpenDrawer={sideRoutes && handleOpen}
      />
      {sideRoutes && (
        <Drawers
          sideRoutes={sideRoutes}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      <ContentWrapper shift={authorized}>{children}</ContentWrapper>
    </Wrapper>
  );
}

PageWrapper.propTypes = {
  sideRoutes: PropTypes.array,
  authorized: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default PageWrapper;
