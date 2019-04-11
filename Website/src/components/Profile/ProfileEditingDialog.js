import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FullScreenDialogWithForm from '../Dialogs/FullScreenDialogWithForm';

function ProfileEditingDialog({ values, handleChange, ...rest }) {
    return (
        <FullScreenDialogWithForm
            title="Редактирование"
            {...rest}
        >
            <TextField
                required
                id="nickName"
                label="Никнейм"
                fullWidth
                value={values.nickName}
                onChange={handleChange('nickName')}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="avatarPath"
                label="URL-адрес аватара"
                fullWidth
                value={values.avatarPath}
                onChange={handleChange('avatarPath')}
                margin="normal"
                variant="outlined"
            />
        </FullScreenDialogWithForm>
    );
}

ProfileEditingDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    values: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default ProfileEditingDialog;
