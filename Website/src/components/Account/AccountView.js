import React from 'react';
import PropTypes from 'prop-types';

function AccountView({ avatarPath = null, nickName, experience, handleSwitchEditMode }) {
    return (
        <div className="text-center">
            <div className="col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4 mb-4">
                {avatarPath && <img className="img-fluid rounded mb-2" src={avatarPath} alt="&#128565;" />}
                <h3>{nickName}</h3>
                <h6>{experience} опыта</h6>
            </div>
            <button type="button" className="btn btn-outline-primary"
                onClick={handleSwitchEditMode}>Редактировать</button>
        </div>
    );
}

AccountView.propTypes = {
    avatarPath: PropTypes.string,
    nickName: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    handleSwitchEditMode: PropTypes.func.isRequired
};

export default AccountView;
