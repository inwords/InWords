import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../actions/UserActions';
import { TopNavbar } from '../components/TopNavbar';

class TopNavbarContainer extends Component {
    render() {
        const { accessToken, logoutAction } = this.props;
        
        return (
            <div className="form-group">
                <TopNavbar accessToken={accessToken} logout={logoutAction} />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logoutAction: () => dispatch(UserActions.logout())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNavbarContainer);
