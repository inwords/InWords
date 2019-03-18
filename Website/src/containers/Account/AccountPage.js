import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountEditingContainer from './AccountEditingContainer';
import AccountViewContainer from './AccountViewContainer';

class AccountPage extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    };

    state = {
        editModeActivated: false
    };

    handleSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { editModeActivated } = this.state;

        return (
            !editModeActivated ?
                <AccountViewContainer handleSwitchEditMode={this.handleSwitchEditMode} /> :
                <AccountEditingContainer handleCancel={this.handleSwitchEditMode} />
        );
    }
}

export default AccountPage;
