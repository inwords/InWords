import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useDrawer from 'src/hooks/useDrawer';
import Header from 'src/layout/Header';
import Drawers from 'src/layout/Drawers';
import ContentWrapper from 'src/layout/ContentWrapper';
import ProfileMenuButton from 'src/layout/ProfileMenuButton';

const routesAuthorized = [
  {
    to: '/dictionary',
    text: 'Словарь'
  },
  {
    to: '/trainings',
    text: 'Обучение'
  }
];

const routesUnauthorized = [
  {
    to: '/signIn',
    text: 'Вход'
  },
  {
    to: '/signUp',
    text: 'Регистрация'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(11),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(16)
    }
  }
}));

function PageWrapper({ sideRoutes, authorized = false, children }) {
  const classes = useStyles();
  const { open, handleOpen, handleClose } = useDrawer();

  return (
    <div className={classes.root}>
      <Header
        mainRoutes={authorized ? routesAuthorized : routesUnauthorized}
        authorized={authorized}
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
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
}

PageWrapper.propTypes = {
  sideRoutes: PropTypes.array,
  authorized: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default PageWrapper;
