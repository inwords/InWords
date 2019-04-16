import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FullScreenDialogWithForm from '../Dialogs/FullScreenDialogWithForm';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    levelPack: {
        paddingTop: theme.spacing.unit * 3,
    },
    wordTranslation: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    wordTranslationActions: {
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
});

function GamePackAdditionDialog({
    descriptionValues, handleDescriptionValuesChange,
    levelPacks, handleLevelPackAddition, handleLevelPackDeletion,
    handleWordTranslationsChange, handleWordTranslationAddition, handleWordTranslationDeletion,
    classes, ...rest
}) {
    return (
        <FullScreenDialogWithForm
            title="Создание"
            {...rest}
        >
            <TextField
                required
                id="title"
                label="Название"
                fullWidth
                value={descriptionValues.title}
                onChange={handleDescriptionValuesChange('title')}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="description"
                label="Описание"
                multiline
                rows="4"
                fullWidth
                value={descriptionValues.description}
                onChange={handleDescriptionValuesChange('description')}
                margin="normal"
                variant="outlined"
            />
            {levelPacks.map((levelPack, levelPackIndex) =>
                <div key={levelPackIndex} className={classes.levelPack}>
                    <Typography variant="h4">
                        Уровень {levelPackIndex + 1}
                    </Typography>
                    {levelPack.wordTranslations.map((wordTranslation, wordTranslationIndex) =>
                        <div key={wordTranslationIndex} className={classes.wordTranslation}>
                            <Typography variant="h6">
                                Пара слов {wordTranslationIndex + 1}
                            </Typography>
                            <TextField
                                required
                                id="wordForeign"
                                label="Слово или фраза"
                                fullWidth
                                value={wordTranslation.wordForeign}
                                onChange={handleWordTranslationsChange(levelPackIndex, wordTranslationIndex, "wordForeign")}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="wordNative"
                                label="Перевод"
                                fullWidth
                                value={wordTranslation.wordNative}
                                onChange={handleWordTranslationsChange(levelPackIndex, wordTranslationIndex, "wordNative")}
                                margin="normal"
                                variant="outlined"
                            />

                        </div>
                    )}
                    <div className={classes.wordTranslationActions}>
                        <Button
                            className={classes.button}
                            onClick={handleWordTranslationAddition(levelPackIndex)}
                        >
                            Добавить пару слов
                        </Button>
                        <Button
                            disabled={levelPacks[levelPackIndex].wordTranslations.length < 2}
                            className={classes.button}
                            onClick={handleWordTranslationDeletion(levelPackIndex)}
                        >
                            Удалить пару слов
                        </Button>
                    </div>
                </div>)}
            <Button
                className={classes.button}
                onClick={handleLevelPackAddition}
            >
                Добавить уровень
            </Button>
            <Button
                disabled={levelPacks.length < 2}
                className={classes.button}
                onClick={handleLevelPackDeletion}
            >
                Удалить уровень
            </Button>

        </FullScreenDialogWithForm>
    );
}

GamePackAdditionDialog.propTypes = {
    descriptionValues: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    handleDescriptionValuesChange: PropTypes.func.isRequired,
    levelPacks: PropTypes.arrayOf(PropTypes.shape({
        level: PropTypes.number.isRequired,
        wordTranslations: PropTypes.arrayOf(PropTypes.shape({
            wordForeign: PropTypes.string.isRequired,
            wordNative: PropTypes.string.isRequired,
        })),
    })).isRequired,
    handleLevelPackAddition: PropTypes.func.isRequired,
    handleLevelPackDeletion: PropTypes.func.isRequired,
    handleWordTranslationsChange: PropTypes.func.isRequired,
    handleWordTranslationAddition: PropTypes.func.isRequired,
    handleWordTranslationDeletion: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GamePackAdditionDialog);
