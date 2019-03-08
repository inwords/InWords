import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class UserInfoViewFragment extends Component {
    render() {
        const { userInfo } = this.props;

        return (
            <div className="container text-center">
                {userInfo.avatarPath ?
                    <img className="img-fluid" src={userInfo.avatarPath} alt="" /> :
                    <Fragment />}
                <h2>
                    {userInfo.nickName}
                </h2>
                <button type="button" className="btn btn-outline-primary"
                    onClick={this.props.handleClickSwitchEditMode}>
                    Редактировать
                </button>
            </div>
        );
    }
}

UserInfoViewFragment.propTypes = {
    userInfo: PropTypes.object.isRequired,
    handleClickSwitchEditMode: PropTypes.func.isRequired
};

export default UserInfoViewFragment;
