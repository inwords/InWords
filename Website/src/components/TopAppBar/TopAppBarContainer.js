import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../actions/accessActions';
import { AppBarContextProvider } from './AppBarContext';
import TopAppBar from './TopAppBar';

function TopAppBarContainer({ userId, loading, ...other }) {
    return (
        <AppBarContextProvider>
            <TopAppBar
                authorized={Boolean(userId)}
                loading={loading}
                {...other}
            />
        </AppBarContextProvider>
    );
}

TopAppBarContainer.propTypes = {
    userId: PropTypes.number,
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId,
        loading: store.common.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        denyAccess: () => dispatch(accessActions.denyAccess())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopAppBarContainer);
