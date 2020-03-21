import React from 'react';
import {
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Dictionary from 'src/components/routes/Dictionary';

const setup = () => {
  const accessData = { token: 'xyz', userId: 1 };
  const mockingWordPairsResponse = {
    toDelete: [],
    toAdd: [
      { userWordPair: 1, wordForeign: 'cat', wordNative: 'кошка' },
      { userWordPair: 2, wordForeign: 'dog', wordNative: 'собака' }
    ]
  };
  const editedWordPair = {
    serverId: 2,
    wordForeign: 'hound',
    wordNative: 'гончая'
  };
  const mockingWordPairsEditResponse = [{ id: 0, serverId: 3 }];
  const newWordPair = {
    wordForeign: 'parrot',
    wordNative: 'попугай'
  };
  const mockingWordPairsAddResponse = { wordIds: [{ id: 0, serverId: 3 }] };
  const mockingWordTranslationResponse = {
    def: [{ tr: [{ text: newWordPair.wordNative }] }]
  };
  global.fetch = mockFetch(mockingWordPairsResponse);
  const utils = renderWithEnvironment(<Dictionary />, {
    initialState: { access: { token: accessData.token } }
  });

  const clickWordPairEdit = word => fireEvent.click(utils.getByText(word));
  const clickWordPairAdd = () => fireEvent.click(utils.getByText('add'));
  const changeWordForeignInput = value =>
    fireEvent.change(utils.getByLabelText('Слово или фраза на английском'), {
      target: { value }
    });
  const changeWordNativeInput = value =>
    fireEvent.change(utils.getByLabelText('Перевод'), {
      target: { value }
    });
  const clickWordPairEditConfirmation = () =>
    fireEvent.click(utils.getByText('Готово'));
  const clickWordPairAddConfirmation = () =>
    fireEvent.click(utils.getByText('Добавить'));
  const clickWordPairCheckbox = id =>
    fireEvent.click(utils.getByTestId(`pair-${id}-checkbox`));
  const clickDel = () => fireEvent.click(utils.getByText('delete'));
  const clickDelСonfirmation = () =>
    fireEvent.click(utils.getByText('Удалить'));
  const changeSearchInput = value =>
    fireEvent.change(utils.getByPlaceholderText('Поиск слова'), {
      target: { value }
    });

  return {
    ...utils,
    mockingWordPairsResponse,
    editedWordPair,
    mockingWordPairsEditResponse,
    newWordPair,
    mockingWordPairsAddResponse,
    mockingWordTranslationResponse,
    clickWordPairEdit,
    clickWordPairAdd,
    changeWordForeignInput,
    changeWordNativeInput,
    clickWordPairEditConfirmation,
    clickWordPairAddConfirmation,
    clickWordPairCheckbox,
    clickDel,
    clickDelСonfirmation,
    changeSearchInput
  };
};

test('edit word pair', async () => {
  const utils = setup();
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
  const utils = setup();
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
  const utils = setup();
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
  const utils = setup();
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

test('find word pair', async () => {
  const utils = setup();
  const rightWordPair = utils.mockingWordPairsResponse.toAdd[0];
  const anotherWordPair = utils.mockingWordPairsResponse.toAdd[1];
  await waitFor(() => utils.getByText(rightWordPair.wordForeign));

  jest.useFakeTimers();
  utils.changeSearchInput(rightWordPair.wordForeign);
  act(() => {
    jest.runAllTimers();
  });

  expect(utils.queryByText(rightWordPair.wordForeign)).toBeTruthy();
  expect(utils.queryByText(anotherWordPair.wordForeign)).toBeNull();
});
