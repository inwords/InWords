import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../../actions/accessActions';
import ProfileMenu from './ProfileMenu';

function ProfileMenuContainer({ userId, denyAccess, history }) {
    const handleLogout = () => {
        denyAccess();
        history.push('/login');
    };

    return (
        <ProfileMenu
            userId={userId}
            handleLogout={handleLogout}
        />
    );
}

ProfileMenuContainer.propTypes = {
    userId: PropTypes.number,
    denyAccess: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        denyAccess: () => dispatch(accessActions.denyAccess())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileMenuContainer));
