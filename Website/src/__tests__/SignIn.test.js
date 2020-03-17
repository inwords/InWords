import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import SignIn from 'src/components/routes/SignIn';

const mockingAccessResponse = {
  token: 'xyz',
  userid: 1
};

const userData = {
  email: '1@1',
  password: '1'
};

describe('sign in', () => {
  it('sign in successfully', async () => {
    global.fetch = mockFetchOnce(mockingAccessResponse);

    renderWithEnvironment(<SignIn />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: userData.email }
    });
    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: userData.password }
    });

    fireEvent.click(screen.getByText('Войти'));

    await wait(() => {
      expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
        access: {
          token: mockingAccessResponse.token,
          userId: mockingAccessResponse.userid
        }
      });
    });
  });
});
