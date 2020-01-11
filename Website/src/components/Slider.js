import React from 'react';
import styled from '@emotion/styled';

// const SliderRoot = styled.input`
//   -webkit-appearance: none;
//   height: 16px;
//   background: ${props => props.theme.palette.grey[300]};
//   border-radius: 2px;
//   outline: none;
//   opacity: 0.7;
//   -webkit-transition: 0.2s;
//   transition: opacity 0.2s;

//   &:hover {
//     opacity: 1;
//   }

//   &::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     width: 16px;
//     height: 16px;
//     background: ${props => props.theme.palette.primary.main};
//     cursor: pointer;
//   }

//   &::-moz-range-thumb {
//     width: 16px;
//     height: 16px;
//     background: ${props => props.theme.palette.primary.main};
//     cursor: pointer;
//   }
// `;

const SliderRoot = styled.input`
  -webkit-appearance: none;
  height: 16px;
  border-radius: 2px;
  outline: none;
  opacity: 0.7;
  background-color: red;
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
    background-color: white;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background-color: white;
    cursor: pointer;
  }
`;

function Slider(props) {
  return <SliderRoot type="range" {...props} />;
}

export default Slider;
