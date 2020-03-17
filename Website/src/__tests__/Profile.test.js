import React, { Fragment } from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Profile from 'src/components/routes/Profile';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

const accessData = {
  token: 'xyz',
  userId: 1
};

const mockingUserInfoResponse = {
  userId: 1,
  nickName: 'prometium',
  avatarPath: null,
  account: { accountId: 1, email: '1@1' }
};

const newUserInfo = {
  nickName: 'promet1um',
  email: '2@1'
};

describe('profile', () => {
  it('receive profile info', async () => {
    global.fetch = mockFetchOnce(mockingUserInfoResponse);

    renderWithEnvironment(<Profile />, {
      initialState: { access: { token: accessData.token } }
    });

    await wait(() => [
      screen.getByText(mockingUserInfoResponse.nickName),
      screen.getByText(mockingUserInfoResponse.account.email)
    ]);
  });

  it('edit nickname', async () => {
    global.fetch = mockFetchOnce();

    renderWithEnvironment(<Profile />, {
      initialState: {
        access: { token: accessData.token },
        userInfo: {
          ...mockingUserInfoResponse,
          nickname: mockingUserInfoResponse.nickName
        }
      }
    });

    fireEvent.click(screen.getByText('Изменить никнейм'));

    fireEvent.change(screen.getByLabelText('Новый никнейм'), {
      target: { value: newUserInfo.nickName }
    });

    fireEvent.click(screen.getByText('Сохранить'));

    await wait(() => screen.getByText(newUserInfo.nickName));
    expect(screen.queryByText(mockingUserInfoResponse.nickName)).toBeNull();
  });

  it('edit email', async () => {
    global.fetch = mockFetchOnce();

    renderWithEnvironment(
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: {
          access: { token: accessData.token },
          userInfo: {
            ...mockingUserInfoResponse,
            nickname: mockingUserInfoResponse.nickName
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

  it('delete account', async () => {
    global.fetch = mockFetchOnce();

    renderWithEnvironment(
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: {
          access: { token: accessData.token },
          userInfo: {
            ...mockingUserInfoResponse,
            nickname: mockingUserInfoResponse.nickName
          }
        }
      }
    );

    fireEvent.click(screen.getByText('Удалить аккаунт'));

    fireEvent.change(screen.getByLabelText('Никнейм'), {
      target: { value: mockingUserInfoResponse.nickName }
    });
    fireEvent.click(screen.getByText('Удалить'));

    await wait(() => screen.getByText('Аккаунт был успешно удален'));
  });
});
