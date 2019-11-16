import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const SearchWrapper = styled.div`
  position: relative;
  border-radius: ${props => props.theme.shape.borderRadius}px;
  background-color: rgba(0, 0, 0, 0.07);
  &:hover {
    background-color: rgba(0, 0, 0, 0.11);
  }
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: auto;
  }

  & .MuiInputBase-root {
    width: 100%;
    color: inherit;
  }

  & .MuiInputBase-input {
    padding 8px 8px 8px 56px;
    transition: width 300ms cubic-bezier(0.4,0,0.2,1) 0ms;
    width: 100%;
    ${props => props.theme.breakpoints.up('sm')} {
      width: 120px;
      &:focus {
        width: 200px;
      }
    }
  }
`;

const SearchIconWrapper = styled.div`
  width: 56px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Search({ value, onChange }) {
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBase
        placeholder="Поиск слова"
        inputProps={{
          'aria-label': 'search',
          name: 'pattern',
          value,
          onChange
        }}
      />
    </SearchWrapper>
  );
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Search;
