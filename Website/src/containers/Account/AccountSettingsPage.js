import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import AccountSettings from '../../components/Account/AccountSettings';

class AccountSettingsPage extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        changeUserInfo: PropTypes.func.isRequired
    };

    state = {
        nickName: this.props.userInfo.nickName,
        avatarPath: this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : ''
    };

    handleChange = (propertyName) => (e) => {
        this.setState({
            [propertyName]: e.target.value
        });
    };

    handleSubmit = (e) => {
        this.props.changeUserInfo({
            NickName: this.state.nickName,
            AvatarPath: this.state.avatarPath
        });

        e.preventDefault();
    };

    render() {
        const { nickName, avatarPath } = this.state;

        return (
            <AccountSettings
                nickName={nickName}
                avatarPath={avatarPath}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfo: (userInfo) => dispatch(UserActions.changeUserInfo(userInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountSettingsPage);
