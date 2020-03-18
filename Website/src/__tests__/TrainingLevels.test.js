import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import TrainingLevels from 'src/components/routes/TrainingLevels';

const setup = () => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const mockingTrainingLevelsResponse = {
    gameId: 1,
    levelInfos: [
      {
        levelId: 1,
        playerStars: 3,
        isAvailable: true,
        level: 1
      }
    ]
  };
  global.fetch = mockFetch(mockingTrainingLevelsResponse);
  const route = '/training/courses/1';
  const utils = renderWithEnvironment(
    <Route path="/training/courses/:courseId">
      <TrainingLevels />
    </Route>,
    {
      initialState: { access: { token: accessData.token } },
      route
    }
  );

  const clickLevel = id => fireEvent.click(utils.getByTestId(`to-level-${id}`));

  return {
    ...utils,
    mockingTrainingLevelsResponse,
    route,
    clickLevel
  };
};

test('select training level', async () => {
  const utils = setup();
  const levelInfo = utils.mockingTrainingLevelsResponse.levelInfos[0];
  await waitFor(() => [screen.getByText(`Уровень ${levelInfo.level}`)]);

  utils.clickLevel(levelInfo.levelId);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${levelInfo.levelId}/0`
  );
});
