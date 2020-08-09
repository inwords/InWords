import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

const setup = ({ initialState, selectedTrainingTypes } = {}) => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const trainingLevel = {
    levelId: 1,
    wordTranslations: [
      { serverId: 1, wordForeign: 'cat', wordNative: 'кошка' },
      { serverId: 2, wordForeign: 'dog', wordNative: 'собака' }
    ]
  };
  const mockingLevelResultResponse = {
    scores: [{ gameLevelId: 1, score: 3 }]
  };
  const utils = renderWithEnvironment(
    <Route path="/:levelId/=)">
      <TrainingsConveyor
        trainingLevel={trainingLevel}
        selectedTrainingTypes={selectedTrainingTypes}
      />
    </Route>,
    {
      initialState: { auth: { token: accessData.token }, ...initialState },
      route: `/${trainingLevel.levelId}/=)`
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

const finishCardsGame = async utils => {
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
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
};

const finishCardsGameWithMistake = async utils => {
  const wordTranslations = utils.trainingLevel.wordTranslations;
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
  wordEls.forEach(wordEl => {
    utils.clickWordEl(wordEl);
  });
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
};

test('finish opened cards game with one mistake', async () => {
  const utils = setup({ selectedTrainingTypes: ['openedCards'] });
  await finishCardsGameWithMistake(utils);
  await waitFor(() => utils.getAllByText('star'));
});

test('finish closed cards game with one mistake', async () => {
  const utils = setup({ selectedTrainingTypes: ['closedCards'] });
  await finishCardsGameWithMistake(utils);
  await waitFor(() => utils.getAllByText('star'));
});

test('finish opened cards game + closed cards game', async () => {
  const utils = setup({
    selectedTrainingTypes: ['openedCards', 'closedCards']
  });
  await finishCardsGame(utils);
  await finishCardsGame(utils);
  await waitFor(() => utils.getAllByText('star'));
});
