import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import Profile from '../../components/Profile/Profile';

class ProfilePage extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        receiveUserInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.receiveUserInfo();
    }

    render() {
        const { userInfo } = this.props;

        return (
            <Profile
                avatarPath={userInfo.avatarPath}
                nickName={userInfo.nickName}
                experience={userInfo.experience}
            />
        );
    }
}

const mapStateToProps = store => {
    return {
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUserInfo: () => dispatch(UserActions.receiveUserInfo())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
