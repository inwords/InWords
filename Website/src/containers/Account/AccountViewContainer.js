import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountView from '../../components/Account/AccountView';

class AccountViewContainer extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        handleSwitchEditMode: PropTypes.func.isRequired
    };

    render() {
        const { userInfo, handleSwitchEditMode } = this.props;

        return (
            <AccountView
                avatarPath={userInfo.avatarPath}
                nickName={userInfo.nickName}
                experience={userInfo.experience}
                handleSwitchEditMode={handleSwitchEditMode}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.user.userInfo
    };
};

export default connect(
    mapStateToProps
)(AccountViewContainer);
