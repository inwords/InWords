import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import TrainingLevels from 'src/components/routes/TrainingLevels';

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const mockingTraininglevelsResponse = {
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

describe('training levels', () => {
  it('receive training levels', async () => {
    global.fetch = mockFetchOnce(mockingTraininglevelsResponse);

    renderWithEnvironment(
      <Route path="/training/courses/:courseId">
        <TrainingLevels />
      </Route>,
      {
        initialState: { access: { token: fakeAccessData.token } },
        route: '/training/courses/1'
      }
    );

    await wait(() => [
      screen.getByText(
        `Уровень ${mockingTraininglevelsResponse.levelInfos[0].level}`
      ),
      screen.getByText(
        `Уровень ${mockingTraininglevelsResponse.levelInfos[1].level}`
      )
    ]);
  });

  it('select training level', async () => {
    const { history } = renderWithEnvironment(
      <Route path="/training/courses/:courseId">
        <TrainingLevels />
      </Route>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          training: {
            coursesMap: {
              1: {
                trainingId: 1,
                levelsInfo: mockingTraininglevelsResponse.levelInfos
              }
            }
          }
        },
        route: '/training/courses/1'
      }
    );

    const levelInfo = mockingTraininglevelsResponse.levelInfos[0];
    fireEvent.click(screen.getByTestId(`to-level-${levelInfo.levelId}`));

    expect(history.location.pathname).toEqual(
      `/training/courses/1/${levelInfo.levelId}/0`
    );
  });
});
