import React from 'react';
import { screen, wait } from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import MainTrainingTypes from 'src/components/routes/MainTrainingTypes';

const accessData = {
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
  global.fetch = mockFetch(mockingWordPairsToTrainResponse);

  renderWithEnvironment(<MainTrainingTypes />, {
    initialState: { access: { token: accessData.token } }
  });

  await wait(() => [
    screen.getByText(
      `Слов на изучение: ${mockingWordPairsToTrainResponse.length}`
    )
  ]);
});
