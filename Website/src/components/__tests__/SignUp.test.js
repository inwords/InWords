import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import SignUp from 'src/components/routes/SignUp';

const setup = () => {
  const userData = { email: '1@1', password: '1' };
  const mockingAccessResponse = { token: 'xyz', userId: 1 };
  global.fetch = mockFetch(mockingAccessResponse);
  const utils = renderWithEnvironment(<SignUp />);

  return {
    ...utils,
    userData,
    mockingAccessResponse
  };
};

const setupGenerally = () => {
  const utils = setup();
  const changeEmailInput = value =>
    fireEvent.change(utils.getByLabelText('Email'), { target: { value } });
  const changePasswordInput = value =>
    fireEvent.change(utils.getByLabelText('Пароль'), { target: { value } });
  const clickSubmit = () =>
    fireEvent.click(utils.getByText('Зарегистрироваться'));

  return {
    ...utils,
    changeEmailInput,
    changePasswordInput,
    clickSubmit
  };
};

const setupAnonymously = () => {
  const utils = setup();
  const clickSubmitAsGuest = () =>
    fireEvent.click(utils.getByText('Войти гостем'));

  return {
    ...utils,
    clickSubmitAsGuest
  };
};

test('sign up successfully', async () => {
  const utils = setupGenerally();
  utils.changeEmailInput(utils.userData.email);
  utils.changePasswordInput(utils.userData.password);
  utils.clickSubmit();

  await waitFor(() => {
    expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
      auth: utils.mockingAccessResponse
    });
  });
});

test('sign up as guest successfully', async () => {
  const utils = setupAnonymously();
  utils.clickSubmitAsGuest();

  await waitFor(() => {
    expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
      auth: utils.mockingAccessResponse
    });
  });
});
