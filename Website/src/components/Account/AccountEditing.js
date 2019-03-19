import React from 'react';
import PropTypes from 'prop-types';

function AccountEditing ({ nickName, avatarPath, handleChange, handleSubmit, handleCancel }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputNickName">Никнейм</label>
                <input type="text" className="form-control" id="inputNickName" required="required"
                    value={nickName} onChange={handleChange("nickName")} />
            </div>
            <div className="form-group">
                <label htmlFor="inputAvatarPath">URL-адрес аватара</label>
                <input type="text" className="form-control" id="inputAvatarPath"
                    value={avatarPath} onChange={handleChange("avatarPath")} />
            </div>
            <div className="btn-group" role="group">
                <button type="submit" className="btn btn-primary">Сохранить</button>
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleCancel}>Отменить</button>
            </div>
        </form>
    );
}

AccountEditing.propTypes = {
    nickName: PropTypes.string.isRequired,
    avatarPath: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default AccountEditing;
