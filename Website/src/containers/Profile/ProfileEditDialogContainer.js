import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import ProfileEditDialog from '../../components/Profile/ProfileEditDialog';

class ProfileEditDialogContainer extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
        changeUserInfo: PropTypes.func.isRequired
    };

    state = {
        nickName: this.props.userInfo.nickName,
        avatarPath: this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : ''
    };

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            if (this.props.open) {
                this.setState({
                    nickName: this.props.userInfo.nickName,
                    avatarPath: this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : ''
                });
            }
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleSubmit = event => {
        this.props.changeUserInfo({
            NickName: this.state.nickName,
            AvatarPath: this.state.avatarPath
        });
        event.preventDefault();
    };

    render() {
        const { open, handleClose } = this.props;

        return (
            <ProfileEditDialog
                values={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                open={open}
                handleClose={handleClose}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeUserInfo: userInfo => dispatch(UserActions.changeUserInfo(userInfo))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProfileEditDialogContainer);
