import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import UserInfoViewFragment from './UserInfoViewFragment';
import UserInfoEditFragment from './UserInfoEditFragment';

class UserInfoPage extends Component {
    state = {
        editModeActivated: false
    };

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { userInfo } = this.props;
        const { editModeActivated } = this.state;

        return (
            <Fragment>
                {!editModeActivated ?
                    <UserInfoViewFragment
                        userInfo={userInfo}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode} /> :
                    <UserInfoEditFragment
                        userInfo={userInfo}
                        handleClickSwitchEditMode={this.handleClickSwitchEditMode}
                        changeUserInfo={this.props.changeUserInfo} />}
            </Fragment>
        );
    }
}

UserInfoPage.propTypes = {
    userInfo: PropTypes.object.isRequired,
    changeUserInfo: PropTypes.func.isRequired
}

export default UserInfoPage;
