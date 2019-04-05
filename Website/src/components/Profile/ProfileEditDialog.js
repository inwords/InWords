import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FullScreenDialogWithForm from '../FullScreenDialogWithForm';

function ProfileEditDialog({ values, handleChange, ...rest }) {
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

ProfileEditDialog.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default ProfileEditDialog;
