import React, { Fragment } from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Courses from 'src/components/routes/Courses';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

const mockingAccessData = {
  token: 'xyz',
  userId: 1
};

const mockingCoursesResponse = [
  {
    gameId: 1,
    description: 'Описание 1',
    title: 'Тема 1',
    isAvailable: true
  },
  {
    gameId: 2,
    description: 'Описание 2',
    title: 'Тема 2',
    isAvailable: true
  }
];

const mockingCourseWordPairsAddingResponse = {
  wordsAdded: 10
};

describe('courses', () => {
  it('receive courses', async () => {
    global.fetch = mockFetchOnce(mockingCoursesResponse);

    renderWithEnvironment(<Courses />, {
      initialState: { access: { token: mockingAccessData.token } }
    });

    await wait(() => [
      screen.getByText(mockingCoursesResponse[0].title),
      screen.getByText(mockingCoursesResponse[0].description),
      screen.getByText(mockingCoursesResponse[1].title),
      screen.getByText(mockingCoursesResponse[1].description)
    ]);
  });

  it('allows the user to select training level', async () => {
    const { history } = renderWithEnvironment(
      <Route path="/training/courses">
        <Courses />
      </Route>,
      {
        initialState: {
          access: { token: mockingAccessData.token },
          training: {
            courses: mockingCoursesResponse
          }
        },
        route: '/training/courses/1'
      }
    );

    const courseInfo = mockingCoursesResponse[0];

    fireEvent.click(screen.getByTestId(`to-course-${courseInfo.gameId}`));

    expect(history.location.pathname).toEqual(
      `/training/courses/${courseInfo.gameId}`
    );
  });

  it('allows the user to add course word pairs to dictionary', async () => {
    global.fetch = mockFetchOnce(mockingCourseWordPairsAddingResponse);

    renderWithEnvironment(
      <Fragment>
        <Courses />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: {
          access: { token: mockingAccessData.token },
          training: {
            courses: mockingCoursesResponse
          }
        },
        route: '/training/courses/1'
      }
    );

    const courseInfo = mockingCoursesResponse[0];

    fireEvent.click(
      screen.getByTestId(`add-to-dictionary-${courseInfo.gameId}`)
    );
    fireEvent.click(screen.getByText('Добавить'));

    await wait(() =>
      screen.getByText(
        `Добавлено новых слов: ${mockingCourseWordPairsAddingResponse.wordsAdded}`
      )
    );
  });
});
