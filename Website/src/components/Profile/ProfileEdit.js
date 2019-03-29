import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ProfileEditDialog from './ProfileEditDialog';

function ProfileEdit(props) {
    const { handleOpen, ...rest } = props;

    return (
        <Fragment>
            <Button size="small" color="primary" onClick={handleOpen}>
                Редактировать
            </Button>
            <ProfileEditDialog {...rest} />
        </Fragment>
    );
}

ProfileEdit.propTypes = {
    handleOpen: PropTypes.func.isRequired
};

export default ProfileEdit;
