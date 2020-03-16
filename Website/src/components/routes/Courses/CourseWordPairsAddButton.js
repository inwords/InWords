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

  const handleAdding = () => {
    dispatch(addCourseWordPairsToDictionary(gameId));
  };

  return (
    <Fragment>
      <IconButton
        data-testid={`add-to-dictionary-${gameId}`}
        onClick={handleOpen}
      >
        <Icon>playlist_add</Icon>
      </IconButton>
      <Dialog
        aria-labelledby="course-word-pairs-add-confirmation-dialog"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="course-word-pairs-add-confirmation-dialog">
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
              handleAdding();
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
