import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../../actions/accessActions';
import {AppBarContextProvider} from '../../../contexts/AppBarContext';
import RegularAppBar from './CustomAppBar';

function CustomAppBarContainer({userId, dataTransferInProgress, ...rest}) {
    return (
        <AppBarContextProvider>
            <RegularAppBar
                authorized={Boolean(userId)}
                dataTransferInProgress={dataTransferInProgress}
                {...rest}
            />
        </AppBarContextProvider>
    );
}

CustomAppBarContainer.propTypes = {
    userId: PropTypes.number,
    dataTransferInProgress: PropTypes.bool.isRequired,
    children: PropTypes.node,
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
)(CustomAppBarContainer);
