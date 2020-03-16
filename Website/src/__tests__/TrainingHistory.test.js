import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import TrainingHistory from 'src/components/routes/TrainingHistory';

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const mockingTrainingHistoryResponse = [
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
];

describe('training history', () => {
  it('receive training history', async () => {
    global.fetch = mockFetchOnce(mockingTrainingHistoryResponse);

    renderWithEnvironment(<TrainingHistory />, {
      initialState: { access: { token: fakeAccessData.token } }
    });

    await wait(() => [
      screen.getByText(`#${mockingTrainingHistoryResponse[0].levelId}`),
      screen.getByText(`#${mockingTrainingHistoryResponse[1].levelId}`)
    ]);
  });

  it('select recent training', async () => {
    const { history } = renderWithEnvironment(
      <Route path="/training/history">
        <TrainingHistory />
      </Route>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          training: {
            history: {
              actual: true,
              recentTrainings: mockingTrainingHistoryResponse
            }
          }
        },
        route: '/training/history'
      }
    );

    const recentTrainingInfo = mockingTrainingHistoryResponse[0];
    fireEvent.click(
      screen.getByTestId(`to-training-${recentTrainingInfo.levelId}-0`)
    );

    expect(history.location.pathname).toEqual(
      `/training/history/${recentTrainingInfo.levelId}/0`
    );
  });
});
