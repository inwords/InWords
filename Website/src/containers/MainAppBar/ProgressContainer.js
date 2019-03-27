import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from '../../components/MainAppBar/Progress';

function ProgressContainer({ isFetching }) {
    return isFetching && <Progress />;
}

ProgressContainer.propTypes = {
    isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
    return {
        isFetching: store.isFetching
    };
};

export default connect(
    mapStateToProps
)(ProgressContainer);
