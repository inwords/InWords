import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from '../../components/AppBar/Progress';

function ProgressContainer({ dataTransferInProgress }) {
    return dataTransferInProgress && <Progress />;
}

ProgressContainer.propTypes = {
    dataTransferInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = store => {
    return {
        dataTransferInProgress: store.dataTransferInProgress
    };
};

export default connect(
    mapStateToProps
)(ProgressContainer);
