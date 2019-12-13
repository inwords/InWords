import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useForm from 'src/hooks/useForm';
import { saveValue } from 'src/localStorage';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';

function TrainingTypesSettings({ localData }) {
  const { inputs, handleChange } = useForm({
    quantity: localData['training-words-quantity'] || 2
  });

  React.useEffect(() => {
    saveValue('training-words-quantity', inputs.quantity);
  }, [inputs.quantity]);

  return (
    <div
      css={css`
        margin-bottom: 8px;
      `}
    >
      <label htmlFor="quantity">Слов в тренировке</label>
      <div>
        <input
          id="quantity"
          name="quantity"
          type="range"
          min="2"
          max="8"
          value={inputs.quantity}
          onChange={handleChange}
        />
      </div>
      <span>{inputs.quantity}</span>
    </div>
  );
}

export default withLocalStorageData(TrainingTypesSettings, [
  'training-words-quantity'
]);
