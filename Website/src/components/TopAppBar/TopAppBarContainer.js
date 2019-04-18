import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../actions/accessActions';
import { AppBarContextProvider } from './AppBarContext';
import TopAppBar from './TopAppBar';

function TopAppBarContainer({ userId, ...other }) {
    return (
        <AppBarContextProvider>
            <TopAppBar
                authorized={Boolean(userId)}
                {...other}
            />
        </AppBarContextProvider>
    );
}

TopAppBarContainer.propTypes = {
    userId: PropTypes.number
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId,
        dataTransferInProgress: store.common.dataTransferInProgress
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
