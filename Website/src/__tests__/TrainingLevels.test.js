import React from 'react';
import { fireEvent, screen, waitForElement } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import TrainingLevels from 'src/components/routes/TrainingLevels';

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const fakeTraininglevelsResponse = {
  gameId: 1,
  levelInfos: [
    {
      levelId: 1,
      playerStars: 3,
      isAvailable: true,
      level: 1
    },
    {
      levelId: 2,
      playerStars: 2,
      isAvailable: true,
      level: 2
    }
  ]
};

describe('interaction with training levels', () => {
  it('allows the user to see training levels', async () => {
    global.fetch = mockFetchOnce(fakeTraininglevelsResponse);

    renderWithEnvironment(
      <Route path="/training/courses/:courseId">
        <TrainingLevels />
      </Route>,
      {
        initialState: { access: { token: fakeAccessData.token } },
        route: '/training/courses/1'
      }
    );

    await waitForElement(() => [
      screen.getByText(
        `Уровень ${fakeTraininglevelsResponse.levelInfos[0].level}`
      ),
      screen.getByText(
        `Уровень ${fakeTraininglevelsResponse.levelInfos[1].level}`
      )
    ]);
  });

  it('allows the user to select training level', async () => {
    global.fetch = mockFetchOnce(fakeTraininglevelsResponse);

    const { history } = renderWithEnvironment(
      <Route path="/training/courses/:courseId">
        <TrainingLevels />
      </Route>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          training: {
            course: {
              trainingId: 1,
              levelsInfo: fakeTraininglevelsResponse.levelInfos
            }
          }
        },
        route: '/training/courses/1'
      }
    );

    const levelInfo = fakeTraininglevelsResponse.levelInfos[0];
    fireEvent.click(screen.getByTestId(`to-level-${levelInfo.levelId}`));

    expect(history.location.pathname).toEqual(
      `/training/courses/1/${levelInfo.levelId}/0`
    );
  });
});
