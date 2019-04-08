import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FullScreenDialogWithForm from '../FullScreenDialogWithForm';

function WordPairActionsDialog({ values, handleChange, ...rest }) {
    return (
        <FullScreenDialogWithForm
            title={values.wordForeign ? 'Редактирование' : 'Добавление'}
            {...rest}
        >
            <TextField
                required
                id="wordForeign"
                label="Слово или фраза"
                fullWidth
                value={values.wordForeign}
                onChange={handleChange('wordForeign')}
                margin="normal"
                variant="outlined"
            />
            <TextField
                required
                id="wordNative"
                label="Перевод"
                fullWidth
                value={values.wordNative}
                onChange={handleChange('wordNative')}
                margin="normal"
                variant="outlined"
            />
        </FullScreenDialogWithForm>
    );
}

WordPairActionsDialog.propTypes = {
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default WordPairActionsDialog;
