import React from 'react';
import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Dictionary from 'src/components/routes/Dictionary';

const setup = ({ ui = <Dictionary />, route = '' } = {}) => {
  const accessData = { token: 'xyz', userId: 1 };
  const mockingWordPairsResponse = {
    toDelete: [],
    toAdd: [
      { userWordPair: 1, wordForeign: 'cat', wordNative: 'кошка' },
      { userWordPair: 2, wordForeign: 'dog', wordNative: 'собака' }
    ]
  };
  global.fetch = mockFetch(mockingWordPairsResponse);
  const utils = renderWithEnvironment(ui, {
    initialState: { auth: { token: accessData.token } },
    route
  });
  const changeWordForeignInput = value =>
    fireEvent.change(utils.getByLabelText('Слово или фраза на английском'), {
      target: { value }
    });
  const changeWordNativeInput = value =>
    fireEvent.change(utils.getByLabelText('Перевод'), {
      target: { value }
    });
  const clickWordPairCheckbox = id =>
    fireEvent.click(utils.getByTestId(`pair-${id}-checkbox`));

  return {
    ...utils,
    mockingWordPairsResponse,
    route,
    changeWordForeignInput,
    changeWordNativeInput,
    clickWordPairCheckbox
  };
};

const setupForWordPairEdit = () => {
  const utils = setup();
  const editedWordPair = {
    serverId: 2,
    wordForeign: 'hound',
    wordNative: 'гончая'
  };
  const mockingWordPairsEditResponse = [{ localId: 0, serverId: 3 }];

  const clickWordPairEdit = word => fireEvent.click(utils.getByText(word));
  const clickWordPairEditConfirmation = () =>
    fireEvent.click(utils.getByText('Готово'));

  return {
    ...utils,
    editedWordPair,
    mockingWordPairsEditResponse,
    clickWordPairEdit,
    clickWordPairEditConfirmation
  };
};

const setupForWordPairAdding = () => {
  const utils = setup();
  const newWordPair = {
    wordForeign: 'parrot',
    wordNative: 'попугай'
  };
  const mockingWordPairsAddResponse = { wordIds: [{ id: 0, serverId: 3 }] };
  const mockingWordTranslationResponse = {
    def: [{ tr: [{ text: newWordPair.wordNative }] }]
  };

  const clickWordPairAdd = () => fireEvent.click(utils.getByText('add'));
  const clickWordPairAddConfirmation = () =>
    fireEvent.click(utils.getByText('Добавить'));

  return {
    ...utils,
    newWordPair,
    mockingWordPairsAddResponse,
    mockingWordTranslationResponse,
    clickWordPairAdd,
    clickWordPairAddConfirmation
  };
};

const setupForWordPairDeletion = () => {
  const utils = setup();
  const clickDel = () => fireEvent.click(utils.getByText('delete'));
  const clickDelСonfirmation = () =>
    fireEvent.click(utils.getByText('Удалить'));

  return {
    ...utils,
    clickDel,
    clickDelСonfirmation
  };
};

const setupForWordPairStudy = () => {
  const utils = setup({
    ui: (
      <Route path="/dictionary">
        <Dictionary />
      </Route>
    ),
    route: '/dictionary'
  });
  const clickMenu = () => fireEvent.click(utils.getByText('more_horiz'));
  const clickStudy = () => fireEvent.click(utils.getByText('Изучать'));

  return {
    ...utils,
    clickMenu,
    clickStudy
  };
};

const setupForWordPairSearch = () => {
  const utils = setup();
  const changeSearchInput = value =>
    fireEvent.change(utils.getByPlaceholderText('Поиск слова'), {
      target: { value }
    });

  return {
    ...utils,
    changeSearchInput
  };
};

test('edit word pair', async () => {
  const utils = setupForWordPairEdit();
  const wordPair = utils.mockingWordPairsResponse.toAdd[1];
  const editedWordPair = utils.editedWordPair;
  await waitFor(() => utils.getByText(wordPair.wordForeign));

  global.fetch = mockFetch(utils.mockingWordPairsEditResponse);
  utils.clickWordPairEdit(wordPair.wordForeign);
  utils.changeWordForeignInput(editedWordPair.wordForeign);
  utils.changeWordNativeInput(editedWordPair.wordNative);
  utils.clickWordPairEditConfirmation();

  await waitFor(() => [
    utils.getByText(editedWordPair.wordForeign),
    utils.getByText(editedWordPair.wordNative)
  ]);
  expect(utils.queryByText(wordPair.wordForeign)).toBeNull();
  expect(utils.queryByText(wordPair.wordNative)).toBeNull();
});

test('add word pair', async () => {
  const utils = setupForWordPairAdding();
  const wordPair = utils.mockingWordPairsResponse.toAdd[1];
  const newWordPair = utils.newWordPair;
  await waitFor(() => utils.getByText(wordPair.wordForeign));

  global.fetch = mockFetch(utils.mockingWordPairsAddResponse);
  utils.clickWordPairAdd();
  utils.changeWordForeignInput(newWordPair.wordForeign);
  utils.changeWordNativeInput(newWordPair.wordNative);
  utils.clickWordPairAddConfirmation();

  await waitFor(() => [
    utils.getByText(newWordPair.wordForeign),
    utils.getByText(newWordPair.wordNative)
  ]);
});

test('add word with automatic translation', async () => {
  const utils = setupForWordPairAdding();
  const wordPair = utils.mockingWordPairsResponse.toAdd[1];
  const newWordPair = utils.newWordPair;
  await waitFor(() => utils.getByText(wordPair.wordForeign));

  global.fetch = mockFetch(utils.mockingWordTranslationResponse);
  jest.useFakeTimers();
  utils.clickWordPairAdd();
  utils.changeWordForeignInput(newWordPair.wordForeign);
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();

  global.fetch = mockFetch(utils.mockingWordPairsAddResponse);
  const translationEl = await waitFor(() =>
    utils.getByText(newWordPair.wordNative)
  );
  fireEvent.click(translationEl);
  utils.clickWordPairAddConfirmation();

  await waitFor(() => [
    utils.getByText(newWordPair.wordForeign),
    utils.getByText(newWordPair.wordNative)
  ]);
});

test('delete word pair', async () => {
  const utils = setupForWordPairDeletion();
  const wordPair = utils.mockingWordPairsResponse.toAdd[0];
  await waitFor(() => utils.getByText(wordPair.wordForeign));

  global.fetch = mockFetch();
  utils.clickWordPairCheckbox(wordPair.userWordPair);
  utils.clickDel();
  utils.clickDelСonfirmation();

  await waitForElementToBeRemoved(() =>
    utils.queryByText(wordPair.wordForeign)
  );
});

test('select word pair to study', async () => {
  const utils = setupForWordPairStudy();
  const wordPair = utils.mockingWordPairsResponse.toAdd[0];
  await waitFor(() => utils.getByText(wordPair.wordForeign));

  utils.clickWordPairCheckbox(wordPair.userWordPair);
  utils.clickMenu();
  utils.clickStudy();

  expect(utils.history.location.pathname).toEqual(`${utils.route}/training/-1`);
});

test('find word pair', async () => {
  const utils = setupForWordPairSearch();
  const rightWordPair = utils.mockingWordPairsResponse.toAdd[0];
  const anotherWordPair = utils.mockingWordPairsResponse.toAdd[1];
  await waitFor(() => utils.getByText(rightWordPair.wordForeign));

  jest.useFakeTimers();
  utils.changeSearchInput(rightWordPair.wordForeign);
  act(() => {
    jest.runAllTimers();
  });

  await expect(utils.getByText(rightWordPair.wordForeign)).toBeTruthy();
  expect(utils.queryByText(anotherWordPair.wordForeign)).toBeNull();
});
