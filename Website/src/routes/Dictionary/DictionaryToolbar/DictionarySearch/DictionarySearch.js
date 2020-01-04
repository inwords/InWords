import React from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/Input';
import SearchIcon from '@material-ui/icons/Search';

import './DictionarySearch.scss';

function DictionarySearch({ value, onChange }) {
  return (
    <div className="dictionary-search-field">
      <div className="dictionary-search-field__icon">
        <SearchIcon />
      </div>
      <Input
        id="dictionary-search"
        aria-label="search"
        type="text"
        placeholder="Поиск слова"
        name="pattern"
        value={value}
        onChange={onChange}
        className="dictionary-search-field__input"
      />
    </div>
  );
}

DictionarySearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DictionarySearch;
