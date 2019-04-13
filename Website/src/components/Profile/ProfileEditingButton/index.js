import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import userApiActions from '../../../actions/userApiActions';
import ProfileEditingButton from './ProfileEditingButton';
import useControlledInputValues from '../../../hooks/useControlledInputValues';

function ProfileEditingButtonContainer({ userInfo, changeUserInfo }) {
    const [values, handleChange, handleReset] = useControlledInputValues({
        nickName: userInfo.nickName,
        avatarPath: userInfo.avatarPath
    });

    const handleSubmit = event => {
        changeUserInfo(values);
        event.preventDefault();
    };

    return (
        <ProfileEditingButton
            values={values}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

ProfileEditingButtonContainer.propTypes = {
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
)(ProfileEditingButtonContainer);
