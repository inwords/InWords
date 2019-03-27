import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAppBar from '../../components/MainAppBar/MainAppBar';

function MainAppBarContainer({ accessToken = null, location, children }) {
    if (!accessToken && location.pathname !== '/login' && location.pathname !== '/register') {
        return <Redirect to='/login' />;
    } else if (accessToken && location.pathname === '/') {
        return <Redirect to='/wordlist' />;
    }

    return (
        <MainAppBar
            accessToken={accessToken}
            children={children}
        />
    );
}

MainAppBarContainer.propTypes = {
    accessToken: PropTypes.string,
    location: PropTypes.object.isRequired,
    children: PropTypes.node
};

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken
    };
};

export default withRouter(connect(
    mapStateToProps
)(MainAppBarContainer));
