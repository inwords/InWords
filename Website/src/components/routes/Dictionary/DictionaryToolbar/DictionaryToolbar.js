import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from 'src/components/core/useForm';
import Toolbar from 'src/components/core/Toolbar';
import Icon from 'src/components/core/Icon';
import Typography from 'src/components/core/Typography';
import IconButton from 'src/components/core/IconButton';
import Space from 'src/components/core/Space';
import DictionarySearch from './DictionarySearch';
import ControlledDictionaryMenu from './ControlledDictionaryMenu';
import ControlledWordPairsDeleteDialog from './ControlledWordPairsDeleteDialog';

import './DictionaryToolbar.scss';

function DictionaryToolbarContainer({
  setPattern,
  checkedValues,
  handleReset,
  handleCheckAll,
  editingModeEnabled
}) {
  const { inputs, handleChange } = useForm({ pattern: '' });

  useEffect(() => {
    const pattern = inputs.pattern;
    let timerId = null;
    if (pattern !== '') {
      timerId = setTimeout(() => {
        setPattern(pattern);
      }, 200);
    } else {
      setPattern(pattern);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [inputs.pattern, setPattern]);

  const numberOfChecked = checkedValues.length;

  return (
    <Toolbar className="dictionary-toolbar">
      {!editingModeEnabled ? (
        <Fragment>
          <div className="dictionary-toolbar-title-block">
            <Typography component="h1" variant="h6">
              Мой словарь
            </Typography>
          </div>
          <Space />
          <DictionarySearch value={inputs.pattern} onChange={handleChange} />
        </Fragment>
      ) : (
        <Fragment>
          <IconButton
            edge="start"
            aria-label="clear selection"
            onClick={handleReset}
            color="inherit"
          >
            <Icon>close</Icon>
          </IconButton>
          <IconButton
            aria-label="check all"
            onClick={handleCheckAll}
            color="inherit"
          >
            <Icon>done_all</Icon>
          </IconButton>
          <Space x={1} />
          <div>
            <Typography component="h2" variant="h6">
              Выбрано: {numberOfChecked}
            </Typography>
          </div>
          <Space />
          <ControlledWordPairsDeleteDialog
            checkedValues={checkedValues}
            handleReset={handleReset}
          />
          <ControlledDictionaryMenu checkedValues={checkedValues} />
        </Fragment>
      )}
    </Toolbar>
  );
}

DictionaryToolbarContainer.propTypes = {
  setPattern: PropTypes.func.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  editingModeEnabled: PropTypes.bool.isRequired
};

export default DictionaryToolbarContainer;
