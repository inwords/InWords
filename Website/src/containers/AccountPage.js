import React, { Component, Fragment } from 'react';
import AccountView from './AccountView';
import AccountEditor from './AccountEditor';

class AccountPage extends Component {
    state = {
        editModeActivated: false
    };

    handleClickSwitchEditMode = () => {
        this.setState({
            editModeActivated: !this.state.editModeActivated
        });
    };

    render() {
        const { editModeActivated } = this.state;
        return (
            <Fragment>
                {!editModeActivated ?
                    <AccountView handleClickSwitchEditMode={this.handleClickSwitchEditMode}/> :
                    <AccountEditor handleClickSwitchEditMode={this.handleClickSwitchEditMode}/>}
            </Fragment>
        );
    }
}

export default AccountPage;
