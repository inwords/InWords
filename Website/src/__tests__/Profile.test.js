import React, { Fragment } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { toHaveAttribute } from '@testing-library/jest-dom/matchers';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Profile from 'src/components/routes/Profile';
import SmartSnackbar from 'src/components/app/SmartSnackbar';

expect.extend({ toHaveAttribute });

const setup = ({ ui = <Profile /> } = {}) => {
  const accessData = { token: 'xyz', userId: 1 };
  const mockingUserInfoResponse = {
    userId: 1,
    nickName: 'prometium',
    avatarPath: null,
    account: { accountId: 1, email: '1@1' }
  };
  global.fetch = mockFetch(mockingUserInfoResponse);
  const utils = renderWithEnvironment(ui, {
    initialState: { auth: { token: accessData.token } }
  });

  return {
    ...utils,
    mockingUserInfoResponse
  };
};

const setupNicknameEdit = utils => {
  const newNickname = 'promet1um';

  const clickNickNameEdit = () =>
    fireEvent.click(utils.getByText('Изменить никнейм'));
  const changeNickNameInput = value =>
    fireEvent.change(utils.getByLabelText('Новый никнейм'), {
      target: { value }
    });
  const clickNickNameSubmit = () =>
    fireEvent.click(utils.getByText('Сохранить'));

  return {
    ...utils,
    newNickname,
    clickNickNameEdit,
    changeNickNameInput,
    clickNickNameSubmit
  };
};

const setupEmailEdit = utils => {
  const newEmail = '2@1';

  const clickEmailEdit = () =>
    fireEvent.click(utils.getByText('Изменить электронный адрес'));
  const changeEmailInput = value =>
    fireEvent.change(utils.getByLabelText('Новый email'), {
      target: { value }
    });
  const clickEmailSubmit = () => fireEvent.click(utils.getByText('Сохранить'));

  return {
    ...utils,
    newEmail,
    clickEmailEdit,
    changeEmailInput,
    clickEmailSubmit
  };
};

const setupAvatarUpload = utils => {
  const mockingAvatarResponse = {
    avatarPath: 'https://inwords.ru/xxx/avatar.png/'
  };

  const clickAvatarEdit = () =>
    fireEvent.click(utils.getByText('Изменить аватар'));
  const changeAvatarInput = file => {
    const upload = utils.getByTestId('avatar-upload');
    Object.defineProperty(upload, 'files', {
      value: [file]
    });
    fireEvent.change(upload);
  };
  const clickAvatarSubmit = () => fireEvent.click(utils.getByText('Сохранить'));

  return {
    ...utils,
    mockingAvatarResponse,
    clickAvatarEdit,
    changeAvatarInput,
    clickAvatarSubmit
  };
};

const setupAccountDeletion = utils => {
  const clickDel = () => fireEvent.click(utils.getByText('Удалить аккаунт'));
  const changeDelNickNameInput = value =>
    fireEvent.change(utils.getByLabelText('Никнейм'), {
      target: { value }
    });
  const clickDelSubmit = () => fireEvent.click(utils.getByText('Удалить'));

  return {
    ...utils,
    clickDel,
    changeDelNickNameInput,
    clickDelSubmit
  };
};

test('edit nickname', async () => {
  let utils = setup();
  utils = setupNicknameEdit(utils);
  const nickName = utils.mockingUserInfoResponse.nickName;
  const newNickName = utils.newNickname;
  await waitFor(() => utils.getByText(nickName));

  global.fetch = mockFetch();
  utils.clickNickNameEdit();
  utils.changeNickNameInput(newNickName);
  utils.clickNickNameSubmit();

  await waitFor(() => utils.getByText(newNickName));
});

test('edit email', async () => {
  let utils = setup({
    ui: (
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>
    )
  });
  utils = setupEmailEdit(utils);
  const email = utils.mockingUserInfoResponse.account.email;
  const newEmail = utils.newEmail;
  await waitFor(() => utils.getByText(email));

  global.fetch = mockFetch();
  utils.clickEmailEdit();
  utils.changeEmailInput(newEmail);
  utils.clickEmailSubmit();

  await waitFor(() =>
    utils.getByText('На новый email было отправлено письмо с подтверждением')
  );
});

test('upload avatar', async () => {
  let utils = setup();
  utils = setupAvatarUpload(utils);
  const nickName = utils.mockingUserInfoResponse.nickName;
  const newAvatarPath = utils.mockingAvatarResponse.avatarPath;
  await waitFor(() => utils.getByText(nickName));

  global.fetch = mockFetch(utils.mockingAvatarResponse);
  utils.clickAvatarEdit();
  utils.changeAvatarInput(
    new File(['(⌐□_□)'], 'avatar.png', { type: 'image/png' })
  );
  await waitFor(() => utils.getByAltText('Avatar-preview'));
  utils.clickAvatarSubmit();

  await waitFor(() =>
    expect(utils.getByAltText('Avatar')).toHaveAttribute('src', newAvatarPath)
  );
});

test('delete account', async () => {
  let utils = setup({
    ui: (
      <Fragment>
        <Profile />
        <SmartSnackbar />
      </Fragment>
    )
  });
  utils = setupAccountDeletion(utils);
  const nickName = utils.mockingUserInfoResponse.nickName;
  await waitFor(() => utils.getByText(nickName));

  global.fetch = mockFetch();
  utils.clickDel();
  utils.changeDelNickNameInput(nickName);
  utils.clickDelSubmit();

  await waitFor(() => utils.getByText('Аккаунт был успешно удален'));
});
