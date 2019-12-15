import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useForm from 'src/hooks/useForm';
import { saveValue } from 'src/localStorage';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';
import Typography from 'src/components/Typography';
import Slider from 'src/components/Slider';

function TrainingTypesSettings({ localData }) {
  const { inputs, handleChange } = useForm({
    quantity: localData['training-words-quantity'] || 8
  });

  React.useEffect(() => {
    saveValue('training-words-quantity', inputs.quantity);
  }, [inputs.quantity]);

  return (
    <div
      css={css`
        margin: 8px 8px 16px;
      `}
    >
      <Typography
        as="label"
        htmlFor="quantity"
        variant="body1"
        gutterBottom
        css={css`
          display: inline-block;
        `}
      >
        Слов в тренировке
      </Typography>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Slider
          id="quantity"
          name="quantity"
          min="2"
          max="8"
          value={inputs.quantity}
          onChange={handleChange}
          css={css`
            margin-right: 16px;
          `}
        />
        <span>{inputs.quantity}</span>
      </div>
    </div>
  );
}

export default withLocalStorageData(TrainingTypesSettings, [
  'training-words-quantity'
]);
