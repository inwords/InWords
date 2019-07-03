import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import userApiActions from '../../actions/userApiActions';
import SignIn from './SignIn';

function SignInContainer() {
    const dispatch = useDispatch();
    const signIn = useCallback(
        userdata => dispatch(userApiActions.signIn(userdata)),
        [dispatch]
    );

    const { inputs, handleChange, handleSubmit } = useForm({
        email: '',
        password: ''
    }, () => signIn(inputs));

    return (
        <SignIn
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default SignInContainer;
