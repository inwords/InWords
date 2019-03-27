import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserActions } from '../../actions/UserActions';
import ProfileMenu from '../../components/MainAppBar/ProfileMenu';

function MainAppBarContainer({ logout }) {
    const handleLogout = () => {
        logout();
    };

    return <ProfileMenu handleLogout={handleLogout} />;
}

MainAppBarContainer.propTypes = {
    logout: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logout())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(MainAppBarContainer);
