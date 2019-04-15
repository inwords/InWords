import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../actions/accessActions';
import { AppBarContextProvider } from '../../contexts/AppBarContext';
import TopAppBar from './TopAppBar';

function TopAppBarContainer({ userId, ...rest }) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <AppBarContextProvider>
            <TopAppBar
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                authorized={Boolean(userId)}
                {...rest}
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
