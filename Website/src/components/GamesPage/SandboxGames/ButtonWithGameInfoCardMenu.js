import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonWithMenu from '../../shared/ButtonWithMenu';

function ButtonWithGameInfoCardMenu({ handleGamePackDeletion }) {
    return (
        <ButtonWithMenu
            id="menu-card"
            icon={<MoreVertIcon />}
            render={() => (
                <MenuItem onClick={handleGamePackDeletion}>Удалить</MenuItem>
            )}
        />
    );
}

ButtonWithGameInfoCardMenu.propTypes = {
    handleGamePackDeletion: PropTypes.func.isRequired
};

export default ButtonWithGameInfoCardMenu;
