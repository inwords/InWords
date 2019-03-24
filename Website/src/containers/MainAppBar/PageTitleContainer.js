import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageTitle from '../../components/MainAppBar/PageTitle';

function PageTitleContainer({ location }) {
    return <PageTitle location={location} />;
}

PageTitleContainer.propTypes = {
    location: PropTypes.object.isRequired
};

export default withRouter(PageTitleContainer);
