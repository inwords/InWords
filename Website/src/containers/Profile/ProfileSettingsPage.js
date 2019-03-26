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

    componentDidMount() {
        this.props.receiveUserInfo();
    }

    handleSubmit = userInfo => event => {
        this.props.changeUserInfo(userInfo);
        event.preventDefault();
    };

    render() {
        const { userId, nickName, avatarPath } = this.props.userInfo;

        return (
            userId && (
                <ProfileSettings
                    defaultNickName={nickName}
                    defaultAvatarPath={avatarPath}
                    handleSubmit={this.handleSubmit}
                />)
        );
    }
}

const mapStateToProps = store => {
    return {
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUserInfo: () => dispatch(UserActions.receiveUserInfo()),
        changeUserInfo: userInfo => dispatch(UserActions.changeUserInfo(userInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSettingsPage);
