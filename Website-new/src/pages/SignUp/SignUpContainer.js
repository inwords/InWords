import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import userApiActions from '../../actions/userApiActions';
import SignUp from './SignUp';

function SignUpContainer() {
    const dispatch = useDispatch();
    const signUp = useCallback(
        userdata => dispatch(userApiActions.signUp(userdata)),
        [dispatch]
    );

    const { inputs, handleChange, handleSubmit } = useForm({
        email: '',
        password: ''
    }, () => signUp(inputs));

    return (
        <SignUp
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default SignUpContainer;
