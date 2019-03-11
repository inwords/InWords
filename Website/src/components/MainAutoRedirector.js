import React, { Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function MainAutoRedirector({ accessToken, location }) {
    return !accessToken && location.pathname !== "/login" ? <Redirect to="/login" /> :
        accessToken && location.pathname === "/" ? <Redirect to="/wordlist" /> :
            <Fragment />;
};

MainAutoRedirector.propTypes = {
    accessToken: PropTypes.string
};

export default withRouter(MainAutoRedirector);
