import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountView from '../../components/Account/Account';

class AccountPage extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    };

    render() {
        const { userInfo } = this.props;

        return (
            <AccountView
                avatarPath={userInfo.avatarPath}
                nickName={userInfo.nickName}
                experience={userInfo.experience}
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
)(AccountPage);
