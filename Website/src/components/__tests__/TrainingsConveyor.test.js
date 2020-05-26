import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { toHaveStyle } from '@testing-library/jest-dom/matchers';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import TrainingsConveyor from 'src/components/routes-common/TrainingsConveyor';

expect.extend({ toHaveStyle });

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

const setupForCardSettingsEdit = params => {
  const utils = setup(params);
  const clickSettings = () => fireEvent.click(utils.getByText('settings'));
  const cardSettings = {
    dimensions: '120',
    textSize: '1'
  };
  const newCardSettings = {
    dimensions: '130',
    textSize: '1.125'
  };
  const changeCardDimensionsInput = value =>
    fireEvent.change(utils.getByDisplayValue(cardSettings.dimensions), {
      target: { value }
    });
  const changeCardTextSizeInput = value =>
    fireEvent.change(utils.getByDisplayValue(cardSettings.textSize), {
      target: { value }
    });
  const clickSettingsSubmit = () =>
    fireEvent.click(utils.getByText('Сохранить'));

  return {
    ...utils,
    cardSettings,
    newCardSettings,
    clickSettings,
    changeCardDimensionsInput,
    changeCardTextSizeInput,
    clickSettingsSubmit
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

test('edit card settings', async () => {
  const utils = setupForCardSettingsEdit({
    selectedTrainingTypes: ['openedCards']
  });
  const firstPair = utils.trainingLevel.wordTranslations[0];
  const firstCard = await waitFor(() =>
    utils.getByTestId(`card-${firstPair.serverId}-${firstPair.wordForeign}`)
  );
  const cardSettings = utils.cardSettings;
  const newCardSettings = utils.newCardSettings;

  expect(firstCard).toHaveStyle({
    width: `${cardSettings.dimensions}px`,
    height: `${cardSettings.dimensions}px`,
    fontSize: `${cardSettings.fontSize}px`
  });
  utils.clickSettings();
  utils.changeCardDimensionsInput(newCardSettings.dimensions);
  utils.changeCardTextSizeInput(newCardSettings.textSize);
  utils.clickSettingsSubmit();
  expect(firstCard).toHaveStyle({
    width: `${newCardSettings.dimensions}px`,
    height: `${newCardSettings.dimensions}px`,
    fontSize: `${newCardSettings.fontSize}px`
  });
});
