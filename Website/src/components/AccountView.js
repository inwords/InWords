import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function AccountView({ userInfo }) {
    return (
        <div className="mb-4">
            {userInfo.avatarPath ?
                <div className="col-md-4 offset-md-4">
                    <img className="img-fluid" src={userInfo.avatarPath} alt="&#128565;" />
                </div> :
                <Fragment />}
            <h2>{userInfo.nickName}</h2>
            <h6>{userInfo.experience} опыта</h6>
        </div>
    );
}

AccountView.propTypes = {
    userInfo: PropTypes.object.isRequired
};

export default AccountView;
