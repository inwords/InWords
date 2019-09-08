import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useForm from 'hooks/useForm';
import { sendActivationCode } from 'actions/accessApiActions';
import EmailChanging from './EmailChanging';

function EmailChangingContainer({ match }) {
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {  
      email: '',
    },
    () => {
      dispatch(sendActivationCode(inputs.email));
    }
  );

  return (
    <EmailChanging
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

EmailChangingContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default EmailChangingContainer;
