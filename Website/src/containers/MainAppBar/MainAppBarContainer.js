import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
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

    render() {
        const { accessToken, location, children } = this.props;

        if (!accessToken && location.pathname !== '/login' && location.pathname !== '/register') {
            return <Redirect to='/login' />;
        } else if (accessToken && location.pathname === '/') {
            return <Redirect to='/wordlist' />;
        }

        return (
            <MainAppBar children={children} />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveUserInfo: () => dispatch(UserActions.receiveUserInfo())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MainAppBarContainer));
