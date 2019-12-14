import React from 'react';
import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import useForm from 'src/hooks/useForm';
import { saveValue } from 'src/localStorage';
import withLocalStorageData from 'src/HOCs/withLocalStorageData';
import Typography from 'src/components/Typography';

const SliderRoot = styled.input`
  -webkit-appearance: none;
  height: 16px;
  background: ${props => props.theme.palette.grey[300]};
  border-radius: 2px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${props => props.theme.palette.primary.main};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: ${props => props.theme.palette.primary.main};
    cursor: pointer;
  }
`;

function Slider(props) {
  return <SliderRoot type="range" {...props} />;
}

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
