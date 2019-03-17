import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../actions/UserActions';

class AccountEditor extends Component {
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
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="inputNickName">Никнейм</label>
                    <input type="text" className="form-control" id="inputNickName" required="required"
                        value={nickName} onChange={this.handleChangeNickName} />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAvatarPath">URL-адрес аватара</label>
                    <input type="text" className="form-control" id="inputAvatarPath"
                        value={avatarPath} onChange={this.handleChangeAvatarPath} />
                </div>
                <div className="btn-group" role="group">
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                    <button type="button" className="btn btn-outline-primary"
                        onClick={handleCancel}>Отменить</button>
                </div>
            </form>
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
)(AccountEditor);
