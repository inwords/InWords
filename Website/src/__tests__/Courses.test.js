import React from 'react';
import { fireEvent, screen, wait } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import Courses from 'src/components/routes/Courses';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

const setup = () => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const mockingCoursesResponse = [
    {
      gameId: 1,
      description: 'Описание 1',
      title: 'Тема 1',
      isAvailable: true
    }
  ];
  const mockingCourseWordPairsAddingResponse = {
    wordsAdded: 10
  };
  global.fetch = mockFetch(mockingCoursesResponse);
  const route = '/training/courses';
  const utils = renderWithEnvironment(
    <Route path="/training/courses">
      <Courses />
      <SmartSnackbar />
    </Route>,
    {
      initialState: { access: { token: accessData.token } },
      route
    }
  );

  const clickCourse = id =>
    fireEvent.click(utils.getByTestId(`to-course-${id}`));
  const clickCourseWordSet = id =>
    fireEvent.click(utils.getByTestId(`to-course-${id}-word-set`));
  const clickAdd = id =>
    fireEvent.click(utils.getByTestId(`add-to-dictionary-${id}`));
  const clickAddConfirmation = () =>
    fireEvent.click(utils.getByText('Добавить'));

  return {
    ...utils,
    mockingCoursesResponse,
    mockingCourseWordPairsAddingResponse,
    route,
    clickCourse,
    clickCourseWordSet,
    clickAdd,
    clickAddConfirmation
  };
};

test('select course', async () => {
  const utils = setup();
  const courseInfo = utils.mockingCoursesResponse[0];
  await wait(() => screen.getByText(courseInfo.title));

  utils.clickCourse(courseInfo.gameId);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.gameId}`
  );
});

test('select course word set', async () => {
  const utils = setup();
  const courseInfo = utils.mockingCoursesResponse[0];
  await wait(() => screen.getByText(courseInfo.title));

  utils.clickCourseWordSet(courseInfo.gameId);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.gameId}/word-set`
  );
});

test('add course word pairs to dictionary', async () => {
  const utils = setup();
  const courseInfo = utils.mockingCoursesResponse[0];
  const wordsAdded = utils.mockingCourseWordPairsAddingResponse.wordsAdded;
  await wait(() => screen.getByText(courseInfo.title));

  global.fetch = mockFetch(utils.mockingCourseWordPairsAddingResponse);
  utils.clickAdd(courseInfo.gameId);
  utils.clickAddConfirmation();

  await wait(() => screen.getByText(`Добавлено новых слов: ${wordsAdded}`));
});
