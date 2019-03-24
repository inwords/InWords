import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import MainAppBar from '../../components/MainAppBar/MainAppBar';

class MainAppBarContainer extends Component {
    static propTypes = {
        accessToken: PropTypes.string,
        avatarPath: PropTypes.string,
        logout: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        children: PropTypes.node
    };

    static defaultProps = {
        accessToken: null,
        avatarPath: null,
        children: null
    };

    state = {
        open: false
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

    render() {
        const { accessToken, location, children } = this.props;
        const { open } = this.state;

        if (!accessToken && location.pathname !== '/login' && location.pathname !== '/register') {
            return <Redirect to='/login' />;
        } else if (accessToken && location.pathname === '/') {
            return <Redirect to='/wordlist' />;
        }

        return (
            <MainAppBar
                accessToken={accessToken}
                handleLogout={this.handleLogout}
                open={open}
                handleDrawerToggle={this.handleDrawerToggle}
                children={children}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken,
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
)(MainAppBarContainer));
