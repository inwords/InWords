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

describe('interaction with sign up', () => {
  it('allows the user to sign up successfully', async () => {
    const response = {
      getToken: () => fakeAccessResponse.token,
      getUserid: () => fakeAccessResponse.userId
    };
    ProfileClient.mockImplementation(
      mockGrpcImplementation('register', response)
    );

    renderWithEnvironment(<SignUp />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: fakeUserData.email }
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: fakeUserData.password }
    });

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
      access: {
        token: fakeAccessResponse.token,
        userId: fakeAccessResponse.userId
      }
    });
  });

  it('allows the user to sign up as guest successfully', async () => {
    const response = {
      getToken: () => fakeAccessResponse.token,
      getUserid: () => fakeAccessResponse.userId
    };
    ProfileClient.mockImplementation(
      mockGrpcImplementation('register', response)
    );

    renderWithEnvironment(<SignUp />);

    fireEvent.click(screen.getByText('Войти гостем'));

    expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
      access: {
        token: fakeAccessResponse.token,
        userId: fakeAccessResponse.userId
      }
    });
  });
});
