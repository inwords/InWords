import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import accessActions from '../../../actions/accessActions';
import { PageTitleContextProvider } from '../../../contexts/PageTitleContext';
import { AppBarContextProvider } from '../../../contexts/AppBarContext';
import RegularAppBar from './RegularAppBar';

function RegularAppBarContainer({ userId, dataTransferInProgress, ...rest }) {
    return (
        <PageTitleContextProvider>
            <AppBarContextProvider>
                <RegularAppBar
                    authorized={Boolean(userId)}
                    dataTransferInProgress={dataTransferInProgress}
                    {...rest}
                />
            </AppBarContextProvider>
        </PageTitleContextProvider>
    );
}

RegularAppBarContainer.propTypes = {
    userId: PropTypes.number,
    dataTransferInProgress: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId,
        dataTransferInProgress: store.dataTransferInProgress
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
)(RegularAppBarContainer);
