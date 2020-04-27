import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Homepage from 'src/components/routes/Homepage';

const setup = () => {
  const mockingAccessResponse = { token: 'xyz', userId: 1 };
  global.fetch = mockFetch(mockingAccessResponse);
  const utils = renderWithEnvironment(<Homepage />);
  const clickSubmit = () =>
    fireEvent.click(utils.getByText('Начать без регистрации'));

  return {
    ...utils,
    mockingAccessResponse,
    clickSubmit
  };
};

test('sign in as guest successfully', async () => {
  const utils = setup();
  utils.clickSubmit();

  await waitFor(() => {
    expect(JSON.parse(window.localStorage.getItem('state'))).toMatchObject({
      auth: utils.mockingAccessResponse
    });
  });
});
