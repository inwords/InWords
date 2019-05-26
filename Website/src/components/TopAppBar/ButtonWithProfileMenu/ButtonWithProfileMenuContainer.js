import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import accessActions from '../../../actions/accessActions';
import ButtonWithProfileMenu from './ButtonWithProfileMenu';

function ButtonWithProfileMenuContainer({ denyAccess }) {
    const handleLogout = () => {
        denyAccess();
    };

    return <ButtonWithProfileMenu handleLogout={handleLogout} />;
}

ButtonWithProfileMenuContainer.propTypes = {
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
)(ButtonWithProfileMenuContainer);
