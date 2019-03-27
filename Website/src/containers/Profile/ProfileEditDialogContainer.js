import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import ProfileEditDialog from '../../components/Profile/ProfileEditDialog';

function ProfileEditDialogContainer(props) {
    const { changeUserInfo, ...rest } = props;

    const handleSubmit = userInfo => event => {
        changeUserInfo(userInfo);
        event.preventDefault();
    };

    return (
        <ProfileEditDialog
            {...rest}
            handleSubmit={handleSubmit}
        />
    );
}

ProfileEditDialogContainer.propTypes = {
    changeUserInfo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfo: userInfo => dispatch(UserActions.changeUserInfo(userInfo))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProfileEditDialogContainer);
