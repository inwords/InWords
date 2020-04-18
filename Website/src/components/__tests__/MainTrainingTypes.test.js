import React from 'react';
import { waitFor } from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import MainTrainingTypes from 'src/components/routes/MainTrainingTypes';

const setup = () => {
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
  global.fetch = mockFetch(mockingWordPairsToTrainResponse);
  const utils = renderWithEnvironment(<MainTrainingTypes />, {
    initialState: { auth: { token: accessData.token } }
  });

  return {
    ...utils,
    mockingWordPairsToTrainResponse
  };
};

test('see number of words to train', async () => {
  const utils = setup();
  const numberOfWords = utils.mockingWordPairsToTrainResponse.length;

  await waitFor(() => utils.getByText(`Слов на изучение: ${numberOfWords}`));
});
