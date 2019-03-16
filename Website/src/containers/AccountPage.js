import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountView from '../components/AccountView';
import AccountEditor from './AccountEditor';

class AccountPage extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    };

    state = {
        editModeActivated: false
    };

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { userInfo } = this.props;
        const { editModeActivated } = this.state;

        return (
            !editModeActivated ?
                <div className="text-center">
                    <AccountView userInfo={userInfo} />
                    <button type="button" className="btn btn-outline-primary"
                        onClick={this.handleClickSwitchEditMode}>Редактировать</button>
                </div> :
                <AccountEditor handleClickCancel={this.handleClickSwitchEditMode} />
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
