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

    render() {
        const { accessToken, avatarPath, isFetching, location } = this.props;

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
