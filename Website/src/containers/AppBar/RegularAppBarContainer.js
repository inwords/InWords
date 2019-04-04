import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegularAppBar from '../../components/AppBar/RegularAppBar';

function RegularAppBarContainer({ accessToken, children }) {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <RegularAppBar
            authorized={Boolean(accessToken)}
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            children={children}
        />
    );
}

RegularAppBarContainer.propTypes = {
    accessToken: PropTypes.string,
    children: PropTypes.node,
};

const mapStateToProps = store => {
    return {
        accessToken: store.accessToken
    };
};

export default connect(
    mapStateToProps
)(RegularAppBarContainer);
