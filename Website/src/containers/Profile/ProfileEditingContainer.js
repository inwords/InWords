import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../../actions/userApiActions';
import ProfileEditing from '../../components/Profile/ProfileEditing';

function ProfileEditingContainer({ userInfo, changeUserInfo }) {
    const [values, setValues] = useState({
        nickName: '',
        avatarPath: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleReset = () => {
        setValues({
            nickName: userInfo.nickName,
            avatarPath: userInfo.avatarPath
        });
    };

    const handleSubmit = event => {
        changeUserInfo({
            NickName: values.nickName,
            AvatarPath: values.avatarPath
        });

        event.preventDefault();
    };

    return (
        <ProfileEditing
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

ProfileEditingContainer.propTypes = {
    userInfo: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired,
    }).isRequired,
    changeUserInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfo: userInfo => dispatch(userApiActions.changeUserInfo(userInfo))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProfileEditingContainer);
