import React, { Fragment } from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import mockGrpcImplementation from 'src/test-utils/mockGrpcImplementation';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import { ProfileClient } from 'src/actions/protobuf-generated/Profile.v2_grpc_web_pb';
import Profile from 'src/components/routes/Profile';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

jest.mock('src/actions/protobuf-generated/Profile.v2_grpc_web_pb');

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const fakeUserInfoResponse = {
  userId: 1,
  nickName: 'prometium',
  avatarPath: null,
  account: { accountId: 1, email: '1@1' }
};

const newUserInfo = {
  nickName: 'promet1um',
  email: '2@1'
};

describe('interaction with the profile', () => {
  it('allows the user to see profile info', async () => {
    global.fetch = mockFetchOnce(fakeUserInfoResponse);

    renderWithEnvironment(<Profile />, {
      initialState: { access: { token: fakeAccessData.token } }
    });

    await wait(() => [
      screen.getByText(fakeUserInfoResponse.nickName),
      screen.getByText(fakeUserInfoResponse.account.email)
    ]);
  });

  it('allows the user to edit nickname', async () => {
    global.fetch = mockFetchOnce();

    renderWithEnvironment(<Profile />, {
      initialState: {
        access: { token: fakeAccessData.token },
        userInfo: {
          ...fakeUserInfoResponse,
          nickname: fakeUserInfoResponse.nickName
        }
      }
    });

    fireEvent.click(screen.getByText('Изменить никнейм'));

    fireEvent.change(screen.getByLabelText('Новый никнейм'), {
      target: { value: newUserInfo.nickName }
    });

    fireEvent.click(screen.getByText('Сохранить'));

    await wait(() => screen.getByText(newUserInfo.nickName));
    expect(screen.queryByText(fakeUserInfoResponse.nickName)).toBeNull();
  });

  it('allows the user to edit email', async () => {
    ProfileClient.mockImplementation(
      mockGrpcImplementation('requestEmailUpdate')
    );

    renderWithEnvironment(
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          userInfo: {
            ...fakeUserInfoResponse,
            nickname: fakeUserInfoResponse.nickName
          }
        }
      }
    );

    fireEvent.click(screen.getByText('Изменить электронный адрес'));

    fireEvent.change(screen.getByLabelText('Новый email'), {
      target: { value: newUserInfo.email }
    });
    fireEvent.click(screen.getByText('Сохранить'));

    await wait(() =>
      screen.getByText('На новый email было отправлено письмо с подтверждением')
    );
  });

  it('allows the user to delete account', async () => {
    ProfileClient.mockImplementation(mockGrpcImplementation('deleteAccount'));

    renderWithEnvironment(
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          userInfo: {
            ...fakeUserInfoResponse,
            nickname: fakeUserInfoResponse.nickName
          }
        }
      }
    );

    fireEvent.click(screen.getByText('Удалить аккаунт'));

    fireEvent.change(screen.getByLabelText('Никнейм'), {
      target: { value: fakeUserInfoResponse.nickName }
    });
    fireEvent.click(screen.getByText('Удалить'));

    await wait(() => screen.getByText('Аккаунт был успешно удален'));
  });
});
