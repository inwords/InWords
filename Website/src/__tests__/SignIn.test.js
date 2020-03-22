import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import SignIn from 'src/components/routes/SignIn';

const setup = () => {
  const mockingAccessResponse = { token: 'xyz', userId: 1 };
  const userData = { email: '1@1', password: '1' };
  global.fetch = mockFetch(mockingAccessResponse);
  const utils = renderWithEnvironment(<SignIn />);
  const changeEmailInput = value =>
    fireEvent.change(utils.getByLabelText('Email'), { target: { value } });
  const changePasswordInput = value =>
    fireEvent.change(utils.getByLabelText('Пароль'), { target: { value } });
  const clickSubmit = () => fireEvent.click(utils.getByText('Войти'));

  return {
    ...utils,
    userData,
    mockingAccessResponse,
    changeEmailInput,
    changePasswordInput,
    clickSubmit
  };
};

test('sign in successfully', async () => {
  const utils = setup();
  utils.changeEmailInput(utils.userData.email);
  utils.changePasswordInput(utils.userData.password);
  utils.clickSubmit();

  await waitFor(() => {
    expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
      access: utils.mockingAccessResponse
    });
  });
});
