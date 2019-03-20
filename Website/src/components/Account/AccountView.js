import React from 'react';
import PropTypes from 'prop-types';

function AccountView({ avatarPath, nickName, experience, handleSwitchEditMode }) {
    return (
        <div className="text-center">
            <div className="mb-4">
                {avatarPath ?
                    <div className="col-md-4 offset-md-4">
                        <img className="img-fluid" src={avatarPath} alt="&#128565;" />
                    </div> :
                    null}
                <h2>{nickName}</h2>
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

AccountView.defaultProps = {
    avatarPath: null
};

export default AccountView;
