import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import MainTrainingSwitcher from 'src/components/routes/MainTrainingSwitcher';

const setup = () => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const trainingLevel = {
    levelId: 0,
    wordTranslations: [
      { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' },
      { serverId: 2, wordForeign: 'dog', wordNative: 'собака' }
    ]
  };
  const mockingLevelResultResponse = {
    classicCardLevelResult: [{ levelId: 0, score: 3 }]
  };
  const utils = renderWithEnvironment(
    <Route path="/training/main/:levelId/:trainingId">
      <MainTrainingSwitcher redirectionUrl="/training/main/0" />
    </Route>,
    {
      initialState: {
        auth: { token: accessData.token },
        wordSet: {
          levelsMap: {
            0: trainingLevel
          }
        }
      },
      route: `/training/main/0/0`
    }
  );

  const clickWordEl = el => fireEvent.click(el);

  return {
    ...utils,
    trainingLevel,
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
  const wordTranslations = utils.trainingLevel.wordTranslations;
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
  const wordTranslations = utils.trainingLevel.wordTranslations;
  await waitFor(() => [
    utils.getByText(wordTranslations[0].wordForeign),
    utils.getByText(wordTranslations[0].wordNative),
    utils.getByText(wordTranslations[1].wordForeign),
    utils.getByText(wordTranslations[1].wordNative)
  ]);
});

test('finish game and play next', async () => {
  let utils = setup();
  utils = setupNext(utils);
  await finishGameQuickly(utils);
  utils.clickNext();
  expect(utils.history.location.pathname).toEqual('/training/main/0');
});
