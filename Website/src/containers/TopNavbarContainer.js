import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { TopNavbar } from '../components/TopNavbar';

class TopNavbarContainer extends Component {
    render() {
        const { accessToken, fetching, logoutAction } = this.props;

        return (
            <TopNavbar
                accessToken={accessToken}
                fetching={fetching}
                logout={logoutAction} />
        );
    }
}

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken,
        fetching: store.fetching
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutAction: () => dispatch(UserActions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNavbarContainer);
