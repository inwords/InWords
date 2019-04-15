import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTransferProgress from './DataTransferProgress';

function DataTransferProgressContainer({ dataTransferInProgress }) {
    return dataTransferInProgress && <DataTransferProgress />;
}

DataTransferProgressContainer.propTypes = {
    dataTransferInProgress: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        dataTransferInProgress: store.common.dataTransferInProgress
    };
};

export default connect(
    mapStateToProps,
)(DataTransferProgressContainer);
