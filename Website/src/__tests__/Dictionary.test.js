import React from 'react';
import {
  act,
  fireEvent,
  screen,
  wait,
  waitForElementToBeRemoved
} from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Dictionary from 'src/components/routes/Dictionary';

const accessData = {
  token: 'xyz',
  userId: 1
};

const mockingWordPairsResponse = {
  toDelete: [],
  toAdd: [
    { wordForeign: 'cat', wordNative: 'кошка', userWordPair: 1 },
    { wordForeign: 'dog', wordNative: 'собака', userWordPair: 2 }
  ]
};

const mockingWordPairsEditResponse = [{ id: 0, serverId: 3 }];

const mockingWordPairsAddResponse = { wordIds: [{ id: 0, serverId: 3 }] };

const wordPairs = [
  { wordForeign: 'cat', wordNative: 'кошка', serverId: 1 },
  { wordForeign: 'dog', wordNative: 'собака', serverId: 2 }
];

const editedWordPair = {
  wordForeign: 'hound',
  wordNative: 'гончая',
  serverId: 2
};

const newWordPair = {
  wordForeign: 'parrot',
  wordNative: 'попугай'
};

describe('dictionary', () => {
  it('receive word pairs', async () => {
    global.fetch = mockFetchOnce(mockingWordPairsResponse);

    renderWithEnvironment(<Dictionary />, {
      initialState: { access: { token: accessData.token } }
    });

    await wait(() => [
      screen.getByText(mockingWordPairsResponse.toAdd[0].wordForeign),
      screen.getByText(mockingWordPairsResponse.toAdd[0].wordNative),
      screen.getByText(mockingWordPairsResponse.toAdd[1].wordForeign),
      screen.getByText(mockingWordPairsResponse.toAdd[1].wordNative)
    ]);
  });

  it('edit word pair', async () => {
    global.fetch = mockFetchOnce(mockingWordPairsEditResponse);

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: accessData.token },
        dictionary: {
          actual: true,
          wordPairs
        }
      }
    });

    fireEvent.click(
      screen.getByText(mockingWordPairsResponse.toAdd[1].wordForeign)
    );

    fireEvent.change(screen.getByLabelText('Слово или фраза на английском'), {
      target: { value: editedWordPair.wordForeign }
    });
    fireEvent.change(screen.getByLabelText('Перевод'), {
      target: { value: editedWordPair.wordNative }
    });

    fireEvent.click(screen.getByText('Готово'));

    await wait(() => [
      screen.getByText(editedWordPair.wordForeign),
      screen.getByText(editedWordPair.wordNative)
    ]);

    expect(
      screen.queryByText(mockingWordPairsResponse.toAdd[1].wordForeign)
    ).toBeNull();
    expect(
      screen.queryByText(mockingWordPairsResponse.toAdd[1].wordNative)
    ).toBeNull();
  });

  it('add new word pair', async () => {
    global.fetch = mockFetchOnce(mockingWordPairsAddResponse);

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: accessData.token },
        dictionary: {
          actual: true,
          wordPairs
        }
      }
    });

    fireEvent.click(screen.getByText('add'));

    fireEvent.change(screen.getByLabelText('Слово или фраза на английском'), {
      target: { value: newWordPair.wordForeign }
    });
    fireEvent.change(screen.getByLabelText('Перевод'), {
      target: { value: newWordPair.wordNative }
    });

    fireEvent.click(screen.getByText('Добавить'));

    await wait(() => [
      screen.getByText(newWordPair.wordForeign),
      screen.getByText(newWordPair.wordNative)
    ]);
  });

  it('delete word pairs', async () => {
    global.fetch = mockFetchOnce();

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: accessData.token },
        dictionary: {
          actual: true,
          wordPairs
        }
      }
    });

    fireEvent.click(
      screen.getByTestId(`pair-${wordPairs[0].serverId}-checkbox`)
    );

    fireEvent.click(screen.getByText('delete'));

    fireEvent.click(screen.getByText('Удалить'));

    await waitForElementToBeRemoved(() =>
      screen.queryByText(mockingWordPairsResponse.toAdd[0].wordForeign)
    );
  });

  it('find word pairs', async () => {
    jest.useFakeTimers();

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: accessData.token },
        dictionary: {
          actual: true,
          wordPairs
        }
      }
    });

    fireEvent.change(screen.getByPlaceholderText('Поиск слова'), {
      target: { value: mockingWordPairsResponse.toAdd[0].wordForeign }
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(
      screen.queryByText(mockingWordPairsResponse.toAdd[0].wordForeign)
    ).toBeTruthy();
    expect(
      screen.queryByText(mockingWordPairsResponse.toAdd[1].wordForeign)
    ).toBeNull();
  });
});
