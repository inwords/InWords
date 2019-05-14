import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import accessActions from '../../../actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer({ denyAccess }) {
    const handleLogout = () => {
        denyAccess();
    };

    return <ProfileMenu handleLogout={handleLogout} />;
}

ProfileMenuContainer.propTypes = {
    userId: PropTypes.number,
    denyAccess: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        denyAccess: () => dispatch(accessActions.denyAccess())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProfileMenuContainer);
