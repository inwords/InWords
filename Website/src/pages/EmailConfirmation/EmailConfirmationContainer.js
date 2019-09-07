import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useForm from 'hooks/useForm';
import { confirmEmail } from 'actions/accessApiActions';
import EmailConfirmation from './EmailConfirmation';

function EmailConfirmationContainer({ match }) {
  const dispatch = useDispatch();

  const { inputs, handleChange, handleSubmit } = useForm(
    {  
      confirmationCode: '',
    },
    () => {
      dispatch(confirmEmail({
          email: match.params.email,
          code: inputs.confirmationCode
      }));
    }
  );

  return (
    <EmailConfirmation
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

EmailConfirmationContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default EmailConfirmationContainer;
