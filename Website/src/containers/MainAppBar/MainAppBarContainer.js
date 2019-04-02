import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainAppBar from '../../components/MainAppBar/MainAppBar';

function MainAppBarContainer(props) {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <MainAppBar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            {...props}
        />
    );
}

MainAppBarContainer.propTypes = {
    accessToken: PropTypes.string,
    children: PropTypes.node
};

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken
    };
};

export default connect(
    mapStateToProps
)(MainAppBarContainer);
