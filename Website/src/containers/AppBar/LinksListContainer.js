import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinksList from '../../components/AppBar/LinksList';

function LinksListContainer({ userId, ...rest }) {
    return (
        <LinksList
            authorized={Boolean(userId)}
            {...rest}
        />
    );
}

LinksListContainer.propTypes = {
    userId: PropTypes.number,
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId
    };
};

export default connect(
    mapStateToProps
)(LinksListContainer);
