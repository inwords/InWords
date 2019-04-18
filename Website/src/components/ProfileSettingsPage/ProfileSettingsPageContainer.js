import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import UpwardButton from '../shared/UpwardButton';
import useForm from '../../hooks/useForm';
import ProfileSettingsPage from './ProfileSettingsPage';
import withActualUserInfo from './withActualUserInfo';

function ProfileSettingsPageContainer({ userInfo, changeUserInfo }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Настройки',
            leftElements: <UpwardButton />,
        });
    }, []);

    const { values, handleChange, handleSubmit } = useForm({
        nickName: userInfo.nickName,
        avatarPath: userInfo.avatarPath
    }, () => changeUserInfo(values));

    return (
        <ProfileSettingsPage
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

ProfileSettingsPageContainer.propTypes = {
    userInfo: PropTypes.shape({
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired
    }).isRequired,
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
)(withActualUserInfo(ProfileSettingsPageContainer));
