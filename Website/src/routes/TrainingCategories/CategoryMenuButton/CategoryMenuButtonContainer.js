import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { initializeTrainingLevel } from 'src/actions/trainingActions';
import CategoryMenuButton from './CategoryMenuButton';

function CategoryMenuButtonContainer() {
//   const wordPairs = useSelector(store => store.wordPairs);

//   const dispatch = useDispatch();
//   const handleAddingInDictionary = () => {
//     dispatch(
//       initializeTrainingLevel({
//         levelId: 0,
//         wordTranslations: wordPairs.filter(({ serverId }) =>
//           checkedValues.includes(serverId)
//         )
//       })
//     );
//   };

  return <CategoryMenuButton />;
}

export default memo(CategoryMenuButtonContainer);
