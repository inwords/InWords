import React, { Fragment } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import mockFetch from 'src/test-utils/mockFetch';
import renderWithEnvironment from 'src/test-utils/renderWithEnvironment';
import WordSets from 'src/components/routes/WordSets';
import SmartSnackbar from 'src/components/app/SmartSnackbar';

const setup = ({ ui = <WordSets />, route = '' } = {}) => {
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
  global.fetch = mockFetch(mockingCoursesResponse);
  const utils = renderWithEnvironment(ui, {
    initialState: { auth: { token: accessData.token } },
    route
  });

  return {
    ...utils,
    mockingCoursesResponse,
    route
  };
};

const setupForWordSetChoice = () => {
  const route = '/training/courses';
  const utils = setup({
    ui: (
      <Route path="/training/courses">
        <WordSets />
      </Route>
    ),
    route
  });
  const clickCourse = id =>
    fireEvent.click(utils.getByTestId(`to-word-set-${id}`));

  return {
    ...utils,
    clickCourse
  };
};

const setupForWordSetPairsChoice = () => {
  const route = '/training/courses';
  const utils = setup({
    ui: (
      <Route path="/training/courses">
        <WordSets />
      </Route>
    ),
    route
  });
  const clickCourseWordSet = id =>
    fireEvent.click(utils.getByTestId(`to-word-set-${id}-pairs`));

  return {
    ...utils,
    clickCourseWordSet
  };
};

const setupForWordSetPairsAdding = () => {
  const utils = setup({
    ui: (
      <Fragment>
        <WordSets />
        <SmartSnackbar />
      </Fragment>
    )
  });
  const mockingCourseWordPairsAddingResponse = {};
  const clickAdd = id =>
    fireEvent.click(utils.getByTestId(`add-to-dictionary-${id}`));
  const clickAddConfirmation = () =>
    fireEvent.click(utils.getByText('Добавить'));

  return {
    ...utils,
    mockingCourseWordPairsAddingResponse,
    clickAdd,
    clickAddConfirmation
  };
};

test('select word set', async () => {
  const utils = setupForWordSetChoice();
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  utils.clickCourse(courseInfo.id);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.id}`
  );
});

test('select word set pairs to see', async () => {
  const utils = setupForWordSetPairsChoice();
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  utils.clickCourseWordSet(courseInfo.id);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.id}/word-pairs`
  );
});

test('add word set pairs to dictionary', async () => {
  const utils = setupForWordSetPairsAdding();
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  global.fetch = mockFetch(utils.mockingCourseWordPairsAddingResponse);
  utils.clickAdd(courseInfo.id);
  utils.clickAddConfirmation();

  await waitFor(() => screen.getByText('Слова из темы добавлены в словарь'));
});
