import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import WordSets from 'src/components/routes/WordSets';
import SmartSnackbar from 'src/components/layout/SmartSnackbar';

const setup = () => {
  const accessData = {
    token: 'xyz',
    userId: 1
  };
  const mockingCoursesResponse = {
    wordSets: [
      {
        id: 1,
        description: 'Описание 1',
        title: 'Тема 1'
      }
    ]
  };
  const mockingCourseWordPairsAddingResponse = {
    wordsAdded: 10
  };
  global.fetch = mockFetch(mockingCoursesResponse);
  const route = '/training/courses';
  const utils = renderWithEnvironment(
    <Route path="/training/courses">
      <WordSets />
      <SmartSnackbar />
    </Route>,
    {
      initialState: { auth: { token: accessData.token } },
      route
    }
  );

  const clickCourse = id =>
    fireEvent.click(utils.getByTestId(`to-course-${id}`));
  const clickCourseWordSet = id =>
    fireEvent.click(utils.getByTestId(`to-word-set-${id}`));
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
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  utils.clickCourse(courseInfo.id);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.id}`
  );
});

test('select course word set', async () => {
  const utils = setup();
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  utils.clickCourseWordSet(courseInfo.id);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.id}/word-pairs`
  );
});

test('add course word pairs to dictionary', async () => {
  const utils = setup();
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  const wordsAdded = utils.mockingCourseWordPairsAddingResponse.wordsAdded;
  await waitFor(() => screen.getByText(courseInfo.title));

  global.fetch = mockFetch(utils.mockingCourseWordPairsAddingResponse);
  utils.clickAdd(courseInfo.id);
  utils.clickAddConfirmation();

  await waitFor(() => screen.getByText(`Добавлено новых слов: ${wordsAdded}`));
});
