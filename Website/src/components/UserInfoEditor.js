import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfoEditor extends Component {
    state = {
        nickName: '',
        avatarPath: ''
    };

    componentDidMount() {
        const { userInfo } = this.props;

        this.setState({
            nickName: userInfo.nickName,
            avatarPath: userInfo.avatarPath ? userInfo.avatarPath : ""
        });
    }

    handleChangeNickName = (event) => {
        this.setState({
            nickName: event.target.value
        });
    };

    handleChangeAvatarPath = (event) => {
        this.setState({
            avatarPath: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.changeUserInfo(new FormData(event.target));
        this.props.handleClickSwitchEditMode();
    };

    render() {
        const { nickName, avatarPath } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputNickName">Никнейм</label>
                    <input type="text" className="form-control" id="inputNickName" name="NickName" required="required" value={nickName} onChange={this.handleChangeNickName} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAvatarPath">URL-адрес аватара</label>
                    <input type="text" className="form-control" id="inputAvatarPath" name="AvatarPath" value={avatarPath} onChange={this.handleChangeAvatarPath} />
                </div>
                <div className="btn-group" role="group">
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                    <button type="button" className="btn btn-outline-primary" onClick={this.props.handleClickSwitchEditMode}>Отменить</button>
                </div>
            </form>
        );
    }
}

UserInfoEditor.propTypes = {
    userInfo: PropTypes.object.isRequired,
    handleClickSwitchEditMode: PropTypes.func.isRequired,
    changeUserInfo: PropTypes.func.isRequired
};

export default UserInfoEditor;
