import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import accessActions from '../../../actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer({ denyAccess, history }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        denyAccess();
        history.push('/login');
    };

    return (
        <ProfileMenu
            anchorEl={anchorEl}
            handleMenu={handleMenu}
            handleClose={handleClose}
            handleLogout={handleLogout}
        />
    );
}

ProfileMenuContainer.propTypes = {
    userId: PropTypes.number,
    denyAccess: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        denyAccess: () => dispatch(accessActions.denyAccess())
    };
};

export default withRouter(connect(
    null,
    mapDispatchToProps
)(ProfileMenuContainer));
