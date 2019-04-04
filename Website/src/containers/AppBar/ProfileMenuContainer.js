import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../actions/accessActions';
import ProfileMenu from '../../components/AppBar/ProfileMenu';

function MainAppBarContainer({ denyAccess, history }) {
    const handleLogout = () => {
        denyAccess();
        history.push('login');
    };

    return <ProfileMenu handleLogout={handleLogout} />;
}

MainAppBarContainer.propTypes = {
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
)(MainAppBarContainer));
