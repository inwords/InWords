import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import { ProfileClient } from 'src/actions/protobuf-generated/Profile.v2_grpc_web_pb';
import SignIn from 'src/components/routes/SignIn';

jest.mock('src/actions/protobuf-generated/Profile.v2_grpc_web_pb');

test('allows the user to login successfully', async () => {
  const response = { getToken: () => 'xyz', getUserid: () => 1 };
  const getToken = jest.fn((_, __, cb) => {
    cb(null, response);
  });
  ProfileClient.mockImplementation(function() {
    this.getToken = getToken;
  });

  const { history } = renderWithEnvironment(<SignIn />, { route: '/sign-in' });

  fireEvent.change(screen.getByLabelText(/Email/), {
    target: { value: '1@1' }
  });
  fireEvent.change(screen.getByLabelText(/Пароль/), {
    target: { value: '1' }
  });

  fireEvent.click(screen.getByText(/Войти/i));

  await (() => {
    expect(getToken).toHaveBeenCalled();
  });

  expect(history.location.pathname).toEqual('/training');
});
