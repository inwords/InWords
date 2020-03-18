import React, { Fragment } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Profile from 'src/components/routes/Profile';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

const setup = () => {
  const accessData = { token: 'xyz', userId: 1 };
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
  global.fetch = mockFetch(mockingUserInfoResponse);
  const utils = renderWithEnvironment(
    <Fragment>
      <Profile />
      <SmartSnackbar />
    </Fragment>,
    {
      initialState: { access: { token: accessData.token } }
    }
  );

  const clickNickNameEdit = () =>
    fireEvent.click(utils.getByText('Изменить никнейм'));
  const changeNickNameInput = value =>
    fireEvent.change(utils.getByLabelText('Новый никнейм'), {
      target: { value }
    });
  const clickNickNameSubmit = () =>
    fireEvent.click(utils.getByText('Сохранить'));

  const clickEmailEdit = () =>
    fireEvent.click(utils.getByText('Изменить электронный адрес'));
  const changeEmailInput = value =>
    fireEvent.change(utils.getByLabelText('Новый email'), {
      target: { value }
    });
  const clickEmailSubmit = () => fireEvent.click(utils.getByText('Сохранить'));

  const clickDel = () => fireEvent.click(utils.getByText('Удалить аккаунт'));
  const changeDelNickNameInput = value =>
    fireEvent.change(utils.getByLabelText('Никнейм'), {
      target: { value }
    });
  const clickDelSubmit = () => fireEvent.click(utils.getByText('Удалить'));

  return {
    ...utils,
    mockingUserInfoResponse,
    newUserInfo,
    clickNickNameEdit,
    changeNickNameInput,
    clickNickNameSubmit,
    clickEmailEdit,
    changeEmailInput,
    clickEmailSubmit,
    clickDel,
    changeDelNickNameInput,
    clickDelSubmit
  };
};

test('edit nickname', async () => {
  const utils = setup();
  const nickName = utils.mockingUserInfoResponse.nickName;
  const newNickName = utils.mockingUserInfoResponse.nickName;
  await waitFor(() => utils.getByText(nickName));

  global.fetch = mockFetch();
  utils.clickNickNameEdit();
  utils.changeNickNameInput(newNickName);
  utils.clickNickNameSubmit();

  await waitFor(() => utils.getByText(newNickName));
});

test('edit email', async () => {
  const utils = setup();
  const email = utils.mockingUserInfoResponse.account.email;
  const newEmail = utils.newUserInfo.email;
  await waitFor(() => utils.getByText(email));

  global.fetch = mockFetch();
  utils.clickEmailEdit();
  utils.changeEmailInput(newEmail);
  utils.clickEmailSubmit();

  await waitFor(() =>
    utils.getByText('На новый email было отправлено письмо с подтверждением')
  );
});

test('delete account', async () => {
  const utils = setup();
  const nickName = utils.mockingUserInfoResponse.nickName;
  await waitFor(() => utils.getByText(nickName));

  global.fetch = mockFetch();
  utils.clickDel();
  utils.changeDelNickNameInput(nickName);
  utils.clickDelSubmit();

  await waitFor(() => utils.getByText('Аккаунт был успешно удален'));
});
