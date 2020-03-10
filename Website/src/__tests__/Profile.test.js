import React, { Fragment } from 'react';
import { fireEvent, screen, waitForElement } from '@testing-library/react';
import { ProfileClient } from 'src/actions/protobuf-generated/Profile.v2_grpc_web_pb';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
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

const fakeNewUserInfo = {
  nickName: 'promet1um',
  email: '2@1'
};

describe('interaction with the profile', () => {
  beforeEach(async () => {
    global.fetch = mockFetchOnce(fakeUserInfoResponse);
  });

  it('allows the user to see and change nickname', async () => {
    renderWithEnvironment(<Profile />, {
      initialState: { access: { token: fakeAccessData.token } },
      route: '/profile'
    });
    await waitForElement(() => screen.getByText(fakeUserInfoResponse.nickName));

    global.fetch = mockFetchOnce();

    fireEvent.click(screen.getByText(/Изменить никнейм/i));

    fireEvent.change(screen.getByLabelText('Новый никнейм'), {
      target: { value: fakeNewUserInfo.nickName }
    });

    fireEvent.click(screen.getByText(/Сохранить/i));

    await waitForElement(() => screen.getByText(fakeNewUserInfo.nickName));
  });

  it('allows the user to see and change email', async () => {
    renderWithEnvironment(
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: { access: { token: fakeAccessData.token } },
        route: '/profile'
      }
    );

    await waitForElement(() =>
      screen.getByText(fakeUserInfoResponse.account.email)
    );

    const response = {};
    const on = (_, cb) => {
      cb({ code: 0 });
    };
    const requestEmailUpdate = (_, __, cb) => {
      cb(null, response);
      return { on };
    };
    ProfileClient.mockImplementation(function() {
      this.requestEmailUpdate = requestEmailUpdate;
    });

    fireEvent.click(screen.getByText(/Изменить электронный адрес/i));

    fireEvent.change(screen.getByLabelText('Новый email'), {
      target: { value: fakeNewUserInfo.email }
    });

    fireEvent.click(screen.getByText(/Сохранить/i));

    await waitForElement(() =>
      screen.getByText('На новый email было отправлено письмо с подтверждением')
    );
  });
});
