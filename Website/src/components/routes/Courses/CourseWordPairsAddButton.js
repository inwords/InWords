import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addCourseWordPairsToDictionary } from 'src/actions/trainingApiActions';
import useDialog from 'src/hooks/useDialog';
import Button from 'src/components/core/Button';
import IconButton from 'src/components/core/IconButton';
import Icon from 'src/components/core/Icon';
import Dialog from 'src/components/core/Dialog';
import DialogTitle from 'src/components/core/DialogTitle';
import DialogContent from 'src/components/core/DialogContent';
import DialogContentText from 'src/components/core/DialogContentText';
import DialogActions from 'src/components/core/DialogActions';

function CourseWordPairsAddButton({ gameId }) {
  const { open, handleOpen, handleClose } = useDialog();

  const dispatch = useDispatch();

  const handleAddingInDictionary = () => {
    dispatch(addCourseWordPairsToDictionary(gameId));
  };

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <Icon>playlist_add</Icon>
      </IconButton>
      <Dialog
        aria-labelledby="theme-word-pairs-add-dialog"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="theme-word-pairs-add-dialog">
          Добавление слов
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Добавить все слова из темы в словарь?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Отменить
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              handleAddingInDictionary();
              handleClose();
            }}
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

CourseWordPairsAddButton.propTypes = {
  gameId: PropTypes.number.isRequired
};

export default CourseWordPairsAddButton;
