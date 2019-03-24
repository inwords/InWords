import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinksList from '../../components/MainAppBar/LinksList';

function LinksListContainer({ accessToken = null, onClick = null }) {
    return (
        <LinksList
            accessToken={accessToken}
            onClick={onClick}
        />
    );
}

LinksListContainer.propTypes = {
    accessToken: PropTypes.string,
    onClick: PropTypes.func
};

const mapStateToProps = (store) => {
    return {
        accessToken: store.accessToken,
    };
};

export default connect(
    mapStateToProps
)(LinksListContainer);
