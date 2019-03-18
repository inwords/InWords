import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import AccountEditing from '../../components/Account/AccountEditing';

class AccountEditingContainer extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        changeUserInfo: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired
    };

    state = {
        nickName: "",
        avatarPath: ""
    };

    componentDidMount() {
        const { userInfo } = this.props;
        this.setState({
            nickName: userInfo.nickName,
            avatarPath: userInfo.avatarPath ? userInfo.avatarPath : ""
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.props.handleCancel();
        }
    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    };

    handleSubmit = (event) => {
        this.props.changeUserInfo({
            NickName: this.state.nickName,
            AvatarPath: this.state.avatarPath
        });

        event.preventDefault();
    };

    render() {
        const { handleCancel } = this.props;
        const { nickName, avatarPath } = this.state;

        return (
            <AccountEditing
                nickName={nickName}
                avatarPath={avatarPath}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCancel={handleCancel}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUserInfo: (userInfo) => dispatch(UserActions.changeUserInfo(userInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountEditingContainer);
