import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApiActions from '../../actions/userApiActions';

function withActualUserInfo(WrappedComponent) {
    function WithActualUserInfo({ userId, userInfo, receiveUserInfo, ...other }) {
        React.useEffect(() => {
            if (userId && userInfo.userId !== userId) {
                receiveUserInfo(userId);
            }
        }, []);

        return (
            userInfo.userId && (
                <WrappedComponent
                    userInfo={userInfo}
                    {...other}
                />)
        );
    }

    WithActualUserInfo.propTypes = {
        userId: PropTypes.number,
        userInfo: PropTypes.shape({
            userId: PropTypes.number
        }).isRequired,
        receiveUserInfo: PropTypes.func.isRequired
    };

    const mapStateToProps = store => {
        return {
            userId: store.access.userId,
            userInfo: store.userInfo
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            receiveUserInfo: userId => dispatch(userApiActions.receiveUserInfo(userId))
        };
    };

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithActualUserInfo.displayName = `withActualUserInfo(${wrappedComponentName})`;

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithActualUserInfo);
}

export default withActualUserInfo;
