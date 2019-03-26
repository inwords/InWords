import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

function WordPairDialog({ defaultWordForeign = '', defaultWordNative = '', open, handleClose, handleSubmit }) {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <TextField
                    required
                    id="wordForeign"
                    label="Слово или фраза"
                    value={wordForeign}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    required
                    id="wordForeign"
                    label="Перевод"
                    value={wordNative}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button type="submit" onClick={handleClose} color="primary">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

WordPairDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default WordPairDialog;
