import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingProgress from './LoadingProgress';

function LoadingProgressContainer({ loading }) {
    return loading && <LoadingProgress />;
}

LoadingProgressContainer.propTypes = {
    loading: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
    return {
        loading: store.common.loading
    };
};

export default connect(
    mapStateToProps,
)(LoadingProgressContainer);
