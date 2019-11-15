import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { receiveTrainingCategoryInfo } from 'src/actions/trainingApiActions';

function withReceivedTrainingCategoryInfo(WrappedComponent) {
  function WithReceivedTrainingCategoryInfo(props) {
    const params = useParams();

    const { trainingId, levelsInfo } = useSelector(store => store.training.trainingCategoryInfo);

    const dispatch = useDispatch();

    const paramCategoryId = +params.categoryId;

    React.useEffect(() => {
      if (trainingId !== paramCategoryId) {
        dispatch(receiveTrainingCategoryInfo(paramCategoryId));
      }
    }, [trainingId, paramCategoryId, dispatch]);

    return (
      trainingId === paramCategoryId && (
        <WrappedComponent trainingId={trainingId} levelsInfo={levelsInfo} {...props} />
      )
    );
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  withReceivedTrainingCategoryInfo.displayName = `withReceivedTrainingCategoryInfo(${wrappedComponentName})`;

  return WithReceivedTrainingCategoryInfo;
}

export default withReceivedTrainingCategoryInfo;
