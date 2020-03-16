import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import SignUp from 'src/components/routes/SignUp';

const mockingAccessResponse = {
  token: 'xyz',
  userId: 1
};

const userData = {
  email: '1@1',
  password: '1'
};

describe('sign up', () => {
  it('sign up successfully', async () => {
    global.fetch = mockFetchOnce(mockingAccessResponse);

    renderWithEnvironment(<SignUp />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: userData.email }
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: userData.password }
    });

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    await wait(() => {
      expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
        access: {
          token: mockingAccessResponse.token,
          userId: mockingAccessResponse.userId
        }
      });
    });
  });

  it('sign up as guest successfully', async () => {
    global.fetch = mockFetchOnce(mockingAccessResponse);

    renderWithEnvironment(<SignUp />);

    fireEvent.click(screen.getByText('Войти гостем'));

    await wait(() => {
      expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
        access: {
          token: mockingAccessResponse.token,
          userId: mockingAccessResponse.userId
        }
      });
    });
  });
});
