import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import ProfileMenu from '../../components/MainAppBar/ProfileMenu';

class MainAppBarContainer extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    handleLogout = () => {
        this.props.logout();
    };

    render() {
        return <ProfileMenu handleLogout={this.handleLogout} />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(MainAppBarContainer);
