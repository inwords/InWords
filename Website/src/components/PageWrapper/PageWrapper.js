import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

function PageWrapper({ sideRoutes, authorized = false, children }) {
  const classes = useStyles();
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <div className={classes.root}>
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
      <ContentWrapper shifted={authorized}>{children}</ContentWrapper>
    </div>
  );
}

PageWrapper.propTypes = {
  sideRoutes: PropTypes.array,
  authorized: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default PageWrapper;
