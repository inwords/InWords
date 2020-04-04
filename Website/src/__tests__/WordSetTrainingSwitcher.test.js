import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import WordSetTrainingSwitcher from 'src/components/routes/WordSetTrainingSwitcher';

afterEach(() => {
  jest.useRealTimers();
});

const setup = ({ initialState } = {}) => {
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
  const utils = renderWithEnvironment(
    <Route path="/training/courses/:wordSetId/:levelId/:trainingId">
      <WordSetTrainingSwitcher />
    </Route>,
    {
      initialState: { auth: { token: accessData.token }, ...initialState },
      route: `/training/courses/1/${mockingTrainingLevelResponse.levelId}/0`
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

const setupReplay = utils => {
  const clickReplay = () => fireEvent.click(utils.getByText('replay'));

  return {
    ...utils,
    clickReplay
  };
};

const setupNext = utils => {
  const clickNext = () => fireEvent.click(utils.getByText('fast_forward'));

  return {
    ...utils,
    clickNext
  };
};

const finishGameQuickly = async utils => {
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
  jest.useRealTimers();

  await waitFor(() => utils.getAllByText('star'));
};

test('finish game and replay', async () => {
  let utils = setup();
  utils = setupReplay(utils);
  await finishGameQuickly(utils);
  utils.clickReplay();
  const wordTranslations = utils.mockingTrainingLevelResponse.wordTranslations;
  await waitFor(() => [
    utils.getByText(wordTranslations[0].wordForeign),
    utils.getByText(wordTranslations[0].wordNative),
    utils.getByText(wordTranslations[1].wordForeign),
    utils.getByText(wordTranslations[1].wordNative)
  ]);
});

test('finish game and play next (empty store)', async () => {
  let utils = setup();
  utils = setupNext(utils);
  await finishGameQuickly(utils);
  utils.clickNext();
  expect(utils.history.location.pathname).toEqual('/training/courses');
});

test('finish game and play next (store has levels info (not last level))', async () => {
  jest.useRealTimers();
  let utils = setup({
    initialState: {
      wordSet: {
        levelsListsMap: {
          1: [
            { levelId: 1, stars: 3, isAvailable: true, level: 1 },
            { levelId: 2, stars: 3, isAvailable: true, level: 2 }
          ]
        }
      }
    }
  });
  utils = setupNext(utils);
  await finishGameQuickly(utils);
  utils.clickNext();
  expect(utils.history.location.pathname).toEqual('/training/courses/1/2/0');
});

test('finish game and play next (store has levels info (last level))', async () => {
  jest.useRealTimers();
  let utils = setup({
    initialState: {
      wordSet: {
        levelsListsMap: {
          1: [{ levelId: 1, stars: 3, isAvailable: true, level: 1 }]
        }
      }
    }
  });
  utils = setupNext(utils);
  await finishGameQuickly(utils);
  utils.clickNext();
  expect(utils.history.location.pathname).toEqual('/training/courses');
});
