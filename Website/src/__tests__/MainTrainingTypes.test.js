import React from 'react';
import { screen, wait } from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import MainTrainingTypes from 'src/components/routes/MainTrainingTypes';

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const mockingWordPairsToTrainResponse = [
  {
    serverId: 1,
    wordForeign: 'dog',
    wordNative: 'собака'
  },
  {
    levelId: 2,
    wordForeign: 'cat',
    wordNative: 'кошка'
  }
];

test('receive words to train', async () => {
  global.fetch = mockFetchOnce(mockingWordPairsToTrainResponse);

  renderWithEnvironment(<MainTrainingTypes />, {
    initialState: { access: { token: fakeAccessData.token } }
  });

  await wait(() => [
    screen.getByText(
      `Слов на изучение: ${mockingWordPairsToTrainResponse.length}`
    )
  ]);
});
