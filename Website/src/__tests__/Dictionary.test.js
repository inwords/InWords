import React from 'react';
import {
  act,
  fireEvent,
  screen,
  waitForElement,
  waitForElementToBeRemoved
} from '@testing-library/react';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Dictionary from 'src/components/routes/Dictionary';

jest.mock('src/actions/protobuf-generated/Dictionary.v2_grpc_web_pb');

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const fakeWordPairsResponse = {
  removedServerIds: [],
  addedWords: [
    { wordForeign: 'cat', wordNative: 'кошка', serverId: 1 },
    { wordForeign: 'dog', wordNative: 'собака', serverId: 2 }
  ]
};

const editedWordPair = {
  wordForeign: 'hound',
  wordNative: 'гончая',
  serverId: 2
};

const fakeWordPairsEditResponse = [{ id: 0, serverId: 3 }];

const newWordPair = {
  wordForeign: 'parrot',
  wordNative: 'попугай'
};

const fakeWordPairsAddResponse = [{ id: 0, serverId: 3 }];

describe('interaction with the dictionary', () => {
  it('allows the user to see wordlist', async () => {
    global.fetch = mockFetchOnce(fakeWordPairsResponse);

    renderWithEnvironment(<Dictionary />, {
      initialState: { access: { token: fakeAccessData.token } }
    });

    await waitForElement(() => [
      screen.getByText(fakeWordPairsResponse.addedWords[0].wordForeign),
      screen.getByText(fakeWordPairsResponse.addedWords[0].wordNative),
      screen.getByText(fakeWordPairsResponse.addedWords[1].wordForeign),
      screen.getByText(fakeWordPairsResponse.addedWords[1].wordNative)
    ]);
  });

  it('allows the user to edit word pair', async () => {
    global.fetch = mockFetchOnce(fakeWordPairsEditResponse);

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: fakeAccessData.token },
        dictionary: {
          actual: true,
          wordPairs: fakeWordPairsResponse.addedWords
        }
      }
    });

    fireEvent.click(
      screen.getByText(fakeWordPairsResponse.addedWords[1].wordForeign)
    );

    fireEvent.change(screen.getByLabelText('Слово или фраза на английском'), {
      target: { value: editedWordPair.wordForeign }
    });
    fireEvent.change(screen.getByLabelText('Перевод'), {
      target: { value: editedWordPair.wordNative }
    });

    fireEvent.click(screen.getByText(/Готово/i));

    await waitForElement(() => [
      screen.getByText(editedWordPair.wordForeign),
      screen.getByText(editedWordPair.wordNative)
    ]);

    expect(
      screen.queryByText(fakeWordPairsResponse.addedWords[1].wordForeign)
    ).toBeNull();
    expect(
      screen.queryByText(fakeWordPairsResponse.addedWords[1].wordNative)
    ).toBeNull();
  });

  it('allows the user to add new word pair', async () => {
    global.fetch = mockFetchOnce(fakeWordPairsAddResponse);

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: fakeAccessData.token },
        dictionary: {
          actual: true,
          wordPairs: fakeWordPairsResponse.addedWords
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

    fireEvent.click(screen.getByText(/Добавить/i));

    await waitForElement(() => [
      screen.getByText(newWordPair.wordForeign),
      screen.getByText(newWordPair.wordNative)
    ]);
  });

  it('allows the user to delete word pairs', async () => {
    global.fetch = mockFetchOnce();

    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: fakeAccessData.token },
        dictionary: {
          actual: true,
          wordPairs: fakeWordPairsResponse.addedWords
        }
      }
    });

    fireEvent.click(
      screen.getByTestId(
        `pair-${fakeWordPairsResponse.addedWords[0].serverId}-checkbox`
      )
    );

    jest.useFakeTimers();

    fireEvent.click(screen.getByText('delete'));

    jest.runOnlyPendingTimers();

    await waitForElementToBeRemoved(() =>
      screen.queryByText(fakeWordPairsResponse.addedWords[0].wordForeign)
    );
  });

  it('allows the user to find word pairs', async () => {
    renderWithEnvironment(<Dictionary />, {
      initialState: {
        access: { token: fakeAccessData.token },
        dictionary: {
          actual: true,
          wordPairs: fakeWordPairsResponse.addedWords
        }
      }
    });

    jest.useFakeTimers();

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Поиск слова'), {
        target: { value: fakeWordPairsResponse.addedWords[0].wordForeign }
      });

      jest.runAllTimers();
    });

    expect(
      screen.queryByText(fakeWordPairsResponse.addedWords[1].wordForeign)
    ).toBeNull();
    expect(
      screen.queryByText(fakeWordPairsResponse.addedWords[0].wordForeign)
    ).toBeTruthy();
  });
});
