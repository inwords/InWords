import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAppBar from '../../components/MainAppBar/MainAppBar';

class MainAppBarContainer extends Component {
    static propTypes = {
        accessToken: PropTypes.string,
        location: PropTypes.object.isRequired,
        children: PropTypes.node
    };

    static defaultProps = {
        accessToken: null,
        children: null
    };

    render() {
        const { accessToken, location, children } = this.props;

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
}

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken
    };
};

export default withRouter(connect(
    mapStateToProps
)(MainAppBarContainer));
