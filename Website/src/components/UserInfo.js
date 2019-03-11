import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import UserInfoView from './UserInfoView';
import UserInfoEditor from './UserInfoEditor';

class UserInfo extends Component {
    state = {
        editModeActivated: false
    };

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { userInfo, changeUserInfo } = this.props;
        const { editModeActivated } = this.state;

        return (
            <Fragment>
                {!editModeActivated ?
                    <UserInfoView
                        userInfo={userInfo}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                    /> :
                    <UserInfoEditor
                        userInfo={userInfo}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                        changeUserInfo={changeUserInfo}
                    />}
            </Fragment>
        );
    }
}

UserInfo.propTypes = {
    userInfo: PropTypes.object.isRequired,
    changeUserInfo: PropTypes.func.isRequired
};

export default UserInfo;
