import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addCategoryWordsToDictionary } from 'src/actions/trainingApiActions';
import CategoryMenuButton from './CategoryMenuButton';

function CategoryMenuButtonContainer({categoryId}) {
  const dispatch = useDispatch();
  const handleAddingInDictionary = () => {
    dispatch(addCategoryWordsToDictionary(categoryId));
  };

  return (
    <CategoryMenuButton handleAddingInDictionary={handleAddingInDictionary} />
  );
}

CategoryMenuButtonContainer.propTypes = {
  categoryId: PropTypes.number.isRequired
};

export default memo(CategoryMenuButtonContainer);
