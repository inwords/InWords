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

    state = {
        anchorEl: null
    };

    handleLogout = () => {
        this.props.logout();
    };

    handleMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render() {
        const { accessToken } = this.props;
        const { anchorEl } = this.state;

        return (
            accessToken && (
                <ProfileMenu
                    anchorEl={anchorEl}
                    handleMenu={this.handleMenu}
                    handleClose={this.handleClose}
                    handleLogout={this.handleLogout}
                />
            )
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
        logout: () => dispatch(UserActions.logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainAppBarContainer);
