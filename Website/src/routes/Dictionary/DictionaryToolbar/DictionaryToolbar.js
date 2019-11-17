import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Search from './Search';
import DictionaryMenuButton from './DictionaryMenuButton';

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 64px;
  padding: 0 24px;
`;

const TitleBlock = styled.div`
  margin-right: auto;
`;

const EntryTitleBlock = styled(TitleBlock)`
  ${props => props.theme.breakpoints.down('xs')} {
    display: none;
  }
`;

const CloseIconButton = styled(IconButton)`
  margin-right: 16px;
`;

const DeleteIconButton = styled(IconButton)`
  color: ${props => props.theme.palette.error.main};
`;

function DictionaryToolbar({
  editingModeEnabled,
  checkedValues,
  handleDelete,
  handleReset,
  inputs,
  handleChange
}) {
  const numberOfChecked = checkedValues.length;

  return (
    <ToolbarContainer>
      {!editingModeEnabled ? (
        <Fragment>
          <EntryTitleBlock>
            <Typography component="h1" variant="h6">
              Словарь
            </Typography>
          </EntryTitleBlock>
          <Search value={inputs.pattern} onChange={handleChange} />
        </Fragment>
      ) : (
        <Fragment>
          <CloseIconButton
            edge="start"
            aria-label="clear selection"
            onClick={handleReset}
            color="inherit"
          >
            <CloseIcon />
          </CloseIconButton>
          <TitleBlock>
            <Typography component="h2" variant="h6">
              Выбрано: {numberOfChecked}
            </Typography>
          </TitleBlock>
          <DeleteIconButton
            aria-label="delete"
            onClick={() => {
              handleDelete();
              handleReset();
            }}
            disabled={numberOfChecked === 0}
          >
            <DeleteIcon />
          </DeleteIconButton>
          <DictionaryMenuButton
            disabled={numberOfChecked === 0}
            checkedValues={checkedValues}
          />
        </Fragment>
      )}
    </ToolbarContainer>
  );
}

DictionaryToolbar.propTypes = {
  editingModeEnabled: PropTypes.bool.isRequired,
  checkedValues: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  inputs: PropTypes.exact({
    pattern: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default DictionaryToolbar;
