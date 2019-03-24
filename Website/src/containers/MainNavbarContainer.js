import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';
import MainNavbar from '../components/MainNavbar';

class MainNavbarContainer extends Component {
    static propTypes = {
        accessToken: PropTypes.string,
        avatarPath: PropTypes.string,
        isFetching: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired
    };

    static defaultProps = {
        accessToken: null,
        avatarPath: null
    };

    state = {
        open: false,
        mobileOpen: false
    };

    componentDidMount() {
        if (this.props.accessToken) {
            this.props.receiveUserInfo();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.accessToken !== prevProps.accessToken) {
            if (this.props.accessToken) {
                this.props.receiveUserInfo();
            }
        }
    }

    handleLogout = () => {
        this.props.logout();
    };

    handleDrawerToggle = (open) => () => {
        this.setState({
            open: open
        });
    };

    handleDrawerToggleMobile = (mobileOpen) => () => {
        this.setState({
            mobileOpen: mobileOpen
        });
    };

    render() {
        const { accessToken, avatarPath, isFetching, children, location } = this.props;
        const { open, mobileOpen } = this.state;

        if (!accessToken && location.pathname !== "/login" && location.pathname !== "/register") {
            return <Redirect to="/login" />;
        } else if (accessToken && location.pathname === "/") {
            return <Redirect to="/wordlist" />;
        }

        return (
            <MainNavbar
                accessToken={accessToken}
                avatarPath={avatarPath}
                isFetching={isFetching}
                handleLogout={this.handleLogout}
                open={open}
                mobileOpen={mobileOpen}
                handleDrawerToggle={this.handleDrawerToggle}
                handleDrawerToggleMobile={this.handleDrawerToggleMobile}
                children={children}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken,
        isFetching: store.isFetching,
        avatarPath: store.user.userInfo.avatarPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout()),
        receiveUserInfo: () => dispatch(UserActions.receiveUserInfo())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNavbarContainer));
