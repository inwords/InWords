import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import ProfileMenu from '../../components/MainAppBar/ProfileMenu';

class MainAppBarContainer extends Component {
    static propTypes = {
        accessToken: PropTypes.string,
        logout: PropTypes.func.isRequired
    };

    static defaultProps = {
        accessToken: null,
    };

    handleLogout = () => {
        this.props.logout();
    };

    render() {
        const { accessToken } = this.props;

        return accessToken && <ProfileMenu handleLogout={this.handleLogout} />;
    }
}

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainAppBarContainer);
