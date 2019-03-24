import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinksList from '../../components/MainAppBar/LinksList';

function LinksListContainer(props) {
    return (
        <LinksList {...props} />
    );
}

LinksListContainer.propTypes = {
    accessToken: PropTypes.string,
    onClick: PropTypes.func
};

LinksListContainer.defaultProps = {
    accessToken: null,
    onClick: null
};

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken,
    };
};

export default connect(
    mapStateToProps
)(LinksListContainer);
