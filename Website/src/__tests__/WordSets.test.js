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
  // const mockingCourseWordPairsAddingResponse = {
  //   wordsAdded: 10
  // };
  global.fetch = mockFetch(mockingCoursesResponse);
  const utils = renderWithEnvironment(ui, {
    initialState: { auth: { token: accessData.token } },
    route
  });

  // const clickCourseWordSet = id =>
  //   fireEvent.click(utils.getByTestId(`to-word-set-${id}-pairs`));
  // const clickAdd = id =>
  //   fireEvent.click(utils.getByTestId(`add-to-dictionary-${id}`));
  // const clickAddConfirmation = () =>
  //   fireEvent.click(utils.getByText('Добавить'));

  return {
    ...utils,
    mockingCoursesResponse,
    //mockingCourseWordPairsAddingResponse,
    route
    //clickCourseWordSet,
    // clickAdd,
    // clickAddConfirmation
  };
};

const setupWordSetSelection = utils => {
  const clickCourse = id =>
    fireEvent.click(utils.getByTestId(`to-word-set-${id}`));

  return {
    ...utils,
    clickCourse
  };
};

const setupWordSetPairsSelection = utils => {
  const clickCourseWordSet = id =>
    fireEvent.click(utils.getByTestId(`to-word-set-${id}-pairs`));

  return {
    ...utils,
    clickCourseWordSet
  };
};

const setupWordSetPairsAdding = utils => {
  const mockingCourseWordPairsAddingResponse = {
    wordsAdded: 10
  };
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
  const route = '/training/courses';
  let utils = setup({
    ui: (
      <Route path="/training/courses">
        <WordSets />
      </Route>
    ),
    route
  });
  utils = setupWordSetSelection(utils);
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  utils.clickCourse(courseInfo.id);

  expect(utils.history.location.pathname).toEqual(`${route}/${courseInfo.id}`);
});

test('select word set pairs to see', async () => {
  const route = '/training/courses';
  let utils = setup({
    ui: (
      <Route path="/training/courses">
        <WordSets />
      </Route>
    ),
    route
  });
  utils = setupWordSetPairsSelection(utils);
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  await waitFor(() => screen.getByText(courseInfo.title));

  utils.clickCourseWordSet(courseInfo.id);

  expect(utils.history.location.pathname).toEqual(
    `${utils.route}/${courseInfo.id}/word-pairs`
  );
});

test('add word set pairs to dictionary', async () => {
  let utils = setup({
    ui: (
      <Fragment>
        <WordSets />
        <SmartSnackbar />
      </Fragment>
    )
  });
  utils = setupWordSetPairsAdding(utils);
  const courseInfo = utils.mockingCoursesResponse.wordSets[0];
  const wordsAdded = utils.mockingCourseWordPairsAddingResponse.wordsAdded;
  await waitFor(() => screen.getByText(courseInfo.title));

  global.fetch = mockFetch(utils.mockingCourseWordPairsAddingResponse);
  utils.clickAdd(courseInfo.id);
  utils.clickAddConfirmation();

  await waitFor(() => screen.getByText(`Добавлено новых слов: ${wordsAdded}`));
});
