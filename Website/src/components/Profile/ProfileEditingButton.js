import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import useOpeningBehavoiur from '../../hooks/useDialogBehaviour';
import ProfileEditingDialog from './ProfileEditingDialog';

function ProfileEditingButton({ handleReset, handleSubmit, ...rest }) {
    const [open, handleOpen, handleClose] = useOpeningBehavoiur();

    const handleOpenWithReset = () => {
        handleOpen();
        handleReset();
    };

    const handleSubmitWithClose = event => {
        handleSubmit(event);
        handleClose();
    };

    return (
        <Fragment>
            <Button size="small" color="primary" onClick={handleOpenWithReset}>
                Редактировать
            </Button>
            <ProfileEditingDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmitWithClose}
                {...rest}
            />
        </Fragment>
    );
}

ProfileEditingButton.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default ProfileEditingButton;
