import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ProfileEditDialogContainer from '../../containers/Profile/ProfileEditDialogContainer';

function ProfileEdit({ userInfo }) {
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Fragment>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Редактировать
            </Button>
            <ProfileEditDialogContainer
                userInfo={userInfo}
                open={open}
                handleClose={handleClose}
            />
        </Fragment>
    );
}

ProfileEdit.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default ProfileEdit;
