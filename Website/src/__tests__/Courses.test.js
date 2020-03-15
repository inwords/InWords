import React, { Fragment } from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetchOnce from 'src/test-utils/mockFetchOnce';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Courses from 'src/components/routes/Courses';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

const fakeAccessData = {
  token: 'xyz',
  userId: 1
};

const fakeCoursesResponse = [
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

const fakeCourseWordPairsAddingResponse = {
  wordsAdded: 10
};

describe('interaction with courses', () => {
  it('allows the user to see courses', async () => {
    global.fetch = mockFetchOnce(fakeCoursesResponse);

    renderWithEnvironment(<Courses />, {
      initialState: { access: { token: fakeAccessData.token } }
    });

    await wait(() => [
      screen.getByText(fakeCoursesResponse[0].title),
      screen.getByText(fakeCoursesResponse[0].description),
      screen.getByText(fakeCoursesResponse[1].title),
      screen.getByText(fakeCoursesResponse[1].description)
    ]);
  });

  it('allows the user to select training level', async () => {
    const { history } = renderWithEnvironment(
      <Route path="/training/courses">
        <Courses />
      </Route>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          training: {
            courses: fakeCoursesResponse
          }
        },
        route: '/training/courses/1'
      }
    );

    const courseInfo = fakeCoursesResponse[0];

    fireEvent.click(screen.getByTestId(`to-course-${courseInfo.gameId}`));

    expect(history.location.pathname).toEqual(
      `/training/courses/${courseInfo.gameId}`
    );
  });

  it('allows the user to add course word pairs to dictionary', async () => {
    global.fetch = mockFetchOnce(fakeCourseWordPairsAddingResponse);

    renderWithEnvironment(
      <Fragment>
        <Courses />
        <SmartSnackbar />
      </Fragment>,
      {
        initialState: {
          access: { token: fakeAccessData.token },
          training: {
            courses: fakeCoursesResponse
          }
        },
        route: '/training/courses/1'
      }
    );

    const courseInfo = fakeCoursesResponse[0];

    fireEvent.click(
      screen.getByTestId(`add-to-dictionary-${courseInfo.gameId}`)
    );
    fireEvent.click(screen.getByText('Добавить'));

    await wait(() =>
      screen.getByText(
        `Добавлено новых слов: ${fakeCourseWordPairsAddingResponse.wordsAdded}`
      )
    );
  });
});
