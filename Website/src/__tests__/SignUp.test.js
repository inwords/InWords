import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import mockGrpcImplementation from 'src/test-utils/mockGrpcImplementation';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import { ProfileClient } from 'src/actions/protobuf-generated/Profile.v2_grpc_web_pb';
import SignUp from 'src/components/routes/SignUp';

jest.mock('src/actions/protobuf-generated/Profile.v2_grpc_web_pb');

const fakeUserData = {
  email: '1@1',
  password: '1'
};

const fakeAccessResponse = {
  token: 'xyz',
  userId: 1
};

test('allows the user to register successfully', async () => {
  const response = {
    getToken: () => fakeAccessResponse.token,
    getUserid: () => fakeAccessResponse.userId
  };
  ProfileClient.mockImplementation(
    mockGrpcImplementation('register', response)
  );

  const { history } = renderWithEnvironment(<SignUp />);

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: fakeUserData.email }
  });
  fireEvent.change(screen.getByLabelText('Пароль'), {
    target: { value: fakeUserData.password }
  });

  fireEvent.click(screen.getByText('Зарегистрироваться'));

  expect(history.location.pathname).toEqual('/profile');
});
