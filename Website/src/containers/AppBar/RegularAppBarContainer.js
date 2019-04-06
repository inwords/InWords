import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegularAppBar from '../../components/AppBar/RegularAppBar';

function RegularAppBarContainer({ token, children }) {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <RegularAppBar
            authorized={Boolean(token)}
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            children={children}
        />
    );
}

RegularAppBarContainer.propTypes = {
    token: PropTypes.string,
    children: PropTypes.node,
};

const mapStateToProps = store => {
    return {
        token: store.access.token
    };
};

export default connect(
    mapStateToProps
)(RegularAppBarContainer);
