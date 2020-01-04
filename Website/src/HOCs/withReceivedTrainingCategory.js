import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingCategory } from 'src/actions/trainingApiActions';

function withReceivedTrainingCategory(WrappedComponent) {
  function WithReceivedTrainingCategory(props) {
    const params = useParams();

    const { trainingId, levelsInfo } = useSelector(
      store => store.training.trainingCategory
    );

    const dispatch = useDispatch();

    const paramCategoryId = +params.categoryId;

    React.useEffect(() => {
      if (trainingId !== paramCategoryId) {
        dispatch(receiveTrainingCategory(paramCategoryId));
      }
    }, [trainingId, paramCategoryId, dispatch]);

    return (
      trainingId === paramCategoryId && (
        <WrappedComponent
          trainingId={trainingId}
          levelsInfo={levelsInfo}
          {...props}
        />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withReceivedTrainingCategory.displayName = `withReceivedTrainingCategory(${wrappedComponentName})`;

  return WithReceivedTrainingCategory;
}

export default withReceivedTrainingCategory;
