import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from '../../components/MainAppBar/Progress';

class ProgressContainer extends Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired
    };

    render() {
        const { isFetching } = this.props;

        return isFetching && <Progress />;
    }
}

const mapStateToProps = (store) => {
    return {
        isFetching: store.isFetching
    };
};

export default connect(
    mapStateToProps
)(ProgressContainer);
