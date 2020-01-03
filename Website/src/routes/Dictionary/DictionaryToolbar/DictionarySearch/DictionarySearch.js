import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'src/components/TextField';

import './DictionarySearch.scss';

function DictionarySearch({ value, onChange }) {
  return (
    <TextField
      id="dictionary-search"
      aria-label="search"
      type="search"
      placeholder="Поиск слова"
      name="pattern"
      value={value}
      onChange={onChange}
      className="dictionary-search"
    />
  );
}

DictionarySearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DictionarySearch;
