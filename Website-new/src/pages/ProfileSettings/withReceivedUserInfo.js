import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userApiActions from '../../actions/userApiActions';

function withReceivedUserInfo(WrappedComponent) {
    function WithReceivedUserInfo({ ...rest }) {
        const userId = useSelector(store => store.access.userId);
        const userInfo = useSelector(store => store.userInfo);
        
        const dispatch = useDispatch();
        const receiveUserInfo = useCallback(
            userId => dispatch(userApiActions.receiveUserInfo(userId)),
            [dispatch]
        );

        useEffect(() => {
            if (userId && userInfo.userId !== userId) {
                receiveUserInfo(userId);
            }
        }, [userId, userInfo.userId, receiveUserInfo]);

        return (
            userInfo.userId && (
                <WrappedComponent
                    userInfo={userInfo}
                    {...rest}
                />)
        );
    }

    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    WithReceivedUserInfo.displayName = `withReceivedUserInfo(${wrappedComponentName})`;

    return WithReceivedUserInfo;
}

export default withReceivedUserInfo;
