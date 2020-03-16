import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import CoursesTrainingSwitcher from 'src/components/routes/CoursesTrainingSwitcher';

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const fakeTrainingLevelResponse = {
  levelId: 1,
  wordTranslations: [
    { wordForeign: 'cat', wordNative: 'кошка', serverId: 1 },
    { wordForeign: 'dog', wordNative: 'собака', serverId: 2 }
  ]
};

const fakeLevelResultResponse = {
  classicCardLevelResult: [{ levelId: 1, score: 3 }]
};

describe('interaction with courses game', () => {
  it('allows the user to see courses game cards', async () => {
    global.fetch = mockFetchOnce(fakeTrainingLevelResponse);

    renderWithEnvironment(
      <Route path="/training/courses/:courseId/:levelId/:trainingId">
        <CoursesTrainingSwitcher />
      </Route>,
      {
        initialState: { access: { token: fakeAccessData.token } },
        route: `/training/courses/1/${fakeTrainingLevelResponse.levelId}/0`
      }
    );

    const wordTranslations = fakeTrainingLevelResponse.wordTranslations;
    await wait(() => [
      screen.getByText(wordTranslations[0].wordForeign),
      screen.getByText(wordTranslations[0].wordNative),
      screen.getByText(wordTranslations[1].wordForeign),
      screen.getByText(wordTranslations[1].wordNative)
    ]);
  });

  it('allows the user to complete courses game', async () => {
    renderWithEnvironment(
      <Route path="/training/courses/:courseId/:levelId/:trainingId">
        <CoursesTrainingSwitcher />
      </Route>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          training: {
            levelsMap: {
              [fakeTrainingLevelResponse.levelId]: fakeTrainingLevelResponse
            }
          }
        },
        route: `/training/courses/1/${fakeTrainingLevelResponse.levelId}/0`
      }
    );

    const wordTranslations = fakeTrainingLevelResponse.wordTranslations;
    await wait(() => [screen.getByText(wordTranslations[0].wordForeign)]);

    jest.useFakeTimers();

    global.fetch = mockFetchOnce(fakeLevelResultResponse);

    fireEvent.click(screen.getByText(wordTranslations[0].wordForeign));
    fireEvent.click(screen.getByText(wordTranslations[0].wordNative));
    fireEvent.click(screen.getByText(wordTranslations[1].wordForeign));
    fireEvent.click(screen.getByText(wordTranslations[1].wordNative));

    jest.runAllTimers();

    wait(() => screen.getByText('star'));
  });
});
