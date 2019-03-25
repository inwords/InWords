import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import ProfileSettings from '../../components/Profile/ProfileSettings';

class ProfileSettingsPage extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        changeUserInfo: PropTypes.func.isRequired,
        receiveUserInfo: PropTypes.func.isRequired
    };

    state = {
        nickName: this.props.userInfo.nickName,
        avatarPath: this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : ''
    };

    componentDidMount() {
        this.props.receiveUserInfo();
    }

    componentDidUpdate(prevProps) {
        const { nickName, avatarPath } = this.props.userInfo;

        if (nickName !== prevProps.userInfo.nickName) {
            this.setState({
                nickName: nickName
            });
        }

        if (avatarPath !== prevProps.userInfo.avatarPath) {
            this.setState({
                avatarPath: avatarPath
            });
        }
    }

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
            <ProfileSettings
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
        receiveUserInfo: () => dispatch(UserActions.receiveUserInfo()),
        changeUserInfo: (userInfo) => dispatch(UserActions.changeUserInfo(userInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSettingsPage);
