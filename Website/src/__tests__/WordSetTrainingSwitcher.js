import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import WordSetTrainingSwitcher from 'src/components/routes/WordSetTrainingSwitcher';

afterEach(() => {
  jest.useRealTimers();
});

const setup = () => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const mockingTrainingLevelResponse = {
    levelId: 1,
    wordTranslations: [
      { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' },
      { serverId: 2, wordForeign: 'dog', wordNative: 'собака' }
    ]
  };
  const mockingLevelResultResponse = {
    classicCardLevelResult: [{ levelId: 1, score: 3 }]
  };
  global.fetch = mockFetch(mockingTrainingLevelResponse);
  const route = `/training/courses/1/${mockingTrainingLevelResponse.levelId}/0`;
  const utils = renderWithEnvironment(
    <Route path="/training/courses/:wordSetId/:levelId/:trainingId">
      <WordSetTrainingSwitcher />
    </Route>,
    {
      initialState: { auth: { token: accessData.token } },
      route
    }
  );

  const clickWordEl = el => fireEvent.click(el);

  return {
    ...utils,
    mockingTrainingLevelResponse,
    mockingLevelResultResponse,
    clickWordEl
  };
};

test('complete word set game', async () => {
  const utils = setup();
  const wordTranslations = utils.mockingTrainingLevelResponse.wordTranslations;
  const wordEls = await waitFor(() => [
    utils.getByText(wordTranslations[0].wordForeign),
    utils.getByText(wordTranslations[0].wordNative),
    utils.getByText(wordTranslations[1].wordForeign),
    utils.getByText(wordTranslations[1].wordNative)
  ]);

  global.fetch = mockFetch(utils.mockingLevelResultResponse);
  jest.useFakeTimers();
  wordEls.forEach(wordEl => {
    utils.clickWordEl(wordEl);
  });
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  act(() => {
    jest.runAllTimers();
  });

  await waitFor(() => utils.getAllByText('star'));
});

test('complete word set game with one mistake', async () => {
  const utils = setup();
  const wordTranslations = utils.mockingTrainingLevelResponse.wordTranslations;
  const wordEls = await waitFor(() => [
    utils.getByText(wordTranslations[0].wordForeign),
    utils.getByText(wordTranslations[0].wordNative),
    utils.getByText(wordTranslations[1].wordForeign),
    utils.getByText(wordTranslations[1].wordNative)
  ]);

  global.fetch = mockFetch(utils.mockingLevelResultResponse);
  jest.useFakeTimers();
  utils.clickWordEl(wordEls[0]);
  utils.clickWordEl(wordEls[3]);
  act(() => {
    jest.runAllTimers();
  });
  wordEls.forEach(wordEl => {
    utils.clickWordEl(wordEl);
  });
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
  act(() => {
    jest.runAllTimers();
  });

  await waitFor(() => utils.getAllByText('star'));
});
