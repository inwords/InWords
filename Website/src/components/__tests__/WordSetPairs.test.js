import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { toBeDisabled } from '@testing-library/jest-dom/matchers';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import WordSetPairs from 'src/components/routes/WordSetPairs';

expect.extend({ toBeDisabled });

const setup = () => {
  const accessData = { token: 'xyz', userId: 1 };
  const mockingWordSetResponse = {
    words: [
      {
        wordPairId: 1,
        hasAdded: false,
        wordForeign: 'cat',
        wordNative: 'кошка'
      },
      {
        wordPairId: 2,
        hasAdded: false,
        wordForeign: 'dog',
        wordNative: 'собака'
      }
    ]
  };
  const mockingWordPairsAddResponse = { wordIds: [{ id: 0, serverId: 3 }] };
  global.fetch = mockFetch(mockingWordSetResponse);
  const route = '/training/courses/1/word-pairs';
  const utils = renderWithEnvironment(
    <Route path="/training/courses/:wordSetId/word-pairs">
      <WordSetPairs />
    </Route>,
    {
      initialState: { auth: { token: accessData.token } },
      route
    }
  );
  const clickWordPairCheckbox = id =>
    fireEvent.click(utils.getByTestId(`pair-${id}-checkbox`));
  const clickAdd = () => fireEvent.click(utils.getByText('add'));

  return {
    ...utils,
    mockingWordSetResponse,
    mockingWordPairsAddResponse,
    clickWordPairCheckbox,
    clickAdd
  };
};

test('add word set pair to dictionary', async () => {
  const utils = setup();
  const wordPair = utils.mockingWordSetResponse.words[1];
  const checkboxEl = await waitFor(() =>
    utils.getByTestId(`pair-${wordPair.wordPairId}-checkbox`)
  );

  global.fetch = mockFetch(utils.mockingWordPairsAddResponse);
  utils.clickWordPairCheckbox(wordPair.wordPairId);
  utils.clickAdd();

  await waitFor(() => expect(checkboxEl).toBeDisabled());
});
