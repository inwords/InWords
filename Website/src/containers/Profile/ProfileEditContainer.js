import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userApiActions } from '../../actions/userApiActions';
import ProfileEdit from '../../components/Profile/ProfileEdit';

function ProfileEditContainer({ userInfo, changeUserInfo }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [values, setValues] = useState({
        nickName: '',
        avatarPath: ''
    });

    useEffect(() => {
        if (open) {
            setValues({
                nickName: userInfo.nickName,
                avatarPath: userInfo.avatarPath ? userInfo.avatarPath : ''
            });
        }
    }, [open]);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        changeUserInfo({
            NickName: values.nickName,
            AvatarPath: values.avatarPath
        });

        event.preventDefault();
        handleClose();
    };

    return (
        <ProfileEdit
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

ProfileEditContainer.propTypes = {
    userInfo: PropTypes.object.isRequired,
    changeUserInfo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfo: userInfo => dispatch(userApiActions.changeUserInfo(userInfo))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProfileEditContainer);
