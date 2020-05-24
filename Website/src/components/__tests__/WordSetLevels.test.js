import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import WordSetLevels from 'src/components/routes/WordSetLevels';

const setup = () => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const mockingTrainingLevelsResponse = {
    levels: [
      {
        levelId: 1,
        score: 3,
        isAvailable: true,
        level: 1
      }
    ]
  };
  global.fetch = mockFetch(mockingTrainingLevelsResponse);
  const route = '/training/courses/1';
  const utils = renderWithEnvironment(
    <Route path="/training/courses/:wordSetId">
      <WordSetLevels />
    </Route>,
    {
      initialState: { auth: { token: accessData.token } },
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

test('select word set level', async () => {
  const utils = setup();
  const level = utils.mockingTrainingLevelsResponse.levels[0];
  await waitFor(() => [screen.getByText(`Уровень ${level.level}`)]);

  utils.clickLevel(level.levelId);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${level.levelId}/=)`
  );
});
