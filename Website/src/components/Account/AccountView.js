import React from 'react';
import PropTypes from 'prop-types';

function AccountView({ avatarPath, nickName, experience, handleSwitchEditMode }) {
    return (
        <div className="col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4 text-center">
            <div className="card mb-4">
                {avatarPath ?
                    <img className="card-img-top" src={avatarPath} alt="&#128565;" /> :
                    null}
                <div className="card-body">
                    <h3>{nickName}</h3>
                    <h6>{experience} опыта</h6>
                </div>
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

AccountView.defaultProps = {
    avatarPath: null
};

export default AccountView;
