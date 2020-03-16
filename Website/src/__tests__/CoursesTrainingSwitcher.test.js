import React from 'react';
import { act, fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import CoursesTrainingSwitcher from 'src/components/routes/CoursesTrainingSwitcher';

const mockingAccessData = {
  token: 'xyz',
  userId: 1
};

const mockingTrainingLevelResponse = {
  levelId: 1,
  wordTranslations: [
    { wordForeign: 'cat', wordNative: 'кошка', serverId: 1 },
    { wordForeign: 'dog', wordNative: 'собака', serverId: 2 }
  ]
};

const mockingLevelResultResponse = {
  classicCardLevelResult: [{ levelId: 1, score: 3 }]
};

describe('courses game', () => {
  it('receive courses game lavel', async () => {
    global.fetch = mockFetchOnce(mockingTrainingLevelResponse);

    renderWithEnvironment(
      <Route path="/training/courses/:courseId/:levelId/:trainingId">
        <CoursesTrainingSwitcher />
      </Route>,
      {
        initialState: { access: { token: mockingAccessData.token } },
        route: `/training/courses/1/${mockingTrainingLevelResponse.levelId}/0`
      }
    );

    const wordTranslations = mockingTrainingLevelResponse.wordTranslations;
    await wait(() => [
      screen.getByText(wordTranslations[0].wordForeign),
      screen.getByText(wordTranslations[0].wordNative),
      screen.getByText(wordTranslations[1].wordForeign),
      screen.getByText(wordTranslations[1].wordNative)
    ]);
  });

  it('complete courses game', async () => {
    jest.useFakeTimers();

    renderWithEnvironment(
      <Route path="/training/courses/:courseId/:levelId/:trainingId">
        <CoursesTrainingSwitcher />
      </Route>,
      {
        initialState: {
          access: { token: mockingAccessData.token },
          training: {
            levelsMap: {
              [mockingTrainingLevelResponse.levelId]: mockingTrainingLevelResponse
            }
          }
        },
        route: `/training/courses/1/${mockingTrainingLevelResponse.levelId}/0`
      }
    );

    const wordTranslations = mockingTrainingLevelResponse.wordTranslations;
    await wait(() => [screen.getByText(wordTranslations[0].wordForeign)]);

    global.fetch = mockFetchOnce(mockingLevelResultResponse);

    fireEvent.click(screen.getByText(wordTranslations[0].wordForeign));
    fireEvent.click(screen.getByText(wordTranslations[0].wordNative));
    fireEvent.click(screen.getByText(wordTranslations[1].wordForeign));
    fireEvent.click(screen.getByText(wordTranslations[1].wordNative));

    await Promise.resolve();
    await Promise.resolve();

    act(() => {
      jest.runAllTimers();
    });

    await wait(() => screen.getAllByText('star'));
  });
});
