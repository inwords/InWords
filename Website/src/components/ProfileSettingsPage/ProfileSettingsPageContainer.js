import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import UpwardButton from '../shared/UpwardButton';
import ProfileSettingsPage from './ProfileSettingsPage';

function ProfileSettingsPageContainer({ userId, userInfo, receiveUserInfo, changeUserInfo }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Настройки',
            leftElements: <UpwardButton />,
        });

        if (userInfo.userId !== userId) {
            receiveUserInfo(userId);
        }
    }, []);

    const [values, setValues] = React.useState({
        nickName: userInfo.nickName,
        avatarPath: userInfo.avatarPath
    });

    React.useEffect(() => {
        setValues({
            nickName: userInfo.nickName,
            avatarPath: userInfo.avatarPath
        });
    }, [userInfo]);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = event => {
        changeUserInfo(values);
        event.preventDefault();
    };

    return (
        userInfo.userId && (
            <ProfileSettingsPage
                values={values}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />)
    );
}

ProfileSettingsPageContainer.propTypes = {
    userId: PropTypes.number,
    userInfo: PropTypes.shape({
        userId: PropTypes.number,
        nickName: PropTypes.string.isRequired,
        avatarPath: PropTypes.string.isRequired
    }).isRequired,
    changeUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId,
        userInfo: store.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUserInfo: userId => dispatch(userApiActions.receiveUserInfo(userId)),
        changeUserInfo: userInfo => dispatch(userApiActions.changeUserInfo(userInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSettingsPageContainer);
