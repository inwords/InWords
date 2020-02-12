import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';
import Input from 'src/components/Input';

import './DictionarySearch.scss';

function DictionarySearch({ value, onChange }) {
  return (
    <div className="dictionary-search-field">
      <div className="dictionary-search-field__icon">
        <Icon>search</Icon>
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
