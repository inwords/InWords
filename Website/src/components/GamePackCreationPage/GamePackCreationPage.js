import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 2,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        marginTop: theme.spacing.unit,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function GamePackCreationPage(
    {
        descriptionValues,
        handleDescriptionValuesChange,
        levelPacks,
        handleLevelPackAddition,
        handleLevelPackDeletion,
        handleWordPairAddition,
        handleWordPairDeletion,
        handleSubmit,
        classes
    }
) {
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        autoFocus
                        id="firstTitle"
                        label="Название на русском"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={descriptionValues.firstTitle}
                        onChange={handleDescriptionValuesChange('firstTitle')}
                    />
                    <TextField
                        id="secondTitle"
                        label="Название на английском"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={descriptionValues.secondTitle}
                        onChange={handleDescriptionValuesChange('secondTitle')}
                    />
                    <TextField
                        id="firstDescription"
                        label="Описание на русском"
                        multiline
                        rows="3"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={descriptionValues.firstDescription}
                        onChange={handleDescriptionValuesChange('firstDescription')}
                    />
                    <TextField
                        id="secondDescription"
                        label="Описание на английском"
                        multiline
                        rows="3"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={descriptionValues.secondDescription}
                        onChange={handleDescriptionValuesChange('secondDescription')}
                    />
                    {levelPacks.map((levelPack, levelPackIndex) =>
                        <Paper key={levelPackIndex} className={classes.paper}>
                            <Typography variant="h6">
                                Уровень {levelPack.level}
                            </Typography>
                            {levelPack.wordPairs.map((wordPair, wordPairIndex) =>
                                <Paper key={wordPairIndex} className={classes.paper}>
                                    <Typography variant="h6">
                                        Пара слов {wordPair.wordPairNumber}
                                    </Typography>
                                    <TextField
                                        required
                                        id="wordForeign"
                                        label="Слово или фраза"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        name={`${levelPackIndex}.${wordPairIndex}.wordForeign`}
                                    />
                                    <TextField
                                        required
                                        id="wordNative"
                                        label="Перевод"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        name={`${levelPackIndex}.${wordPairIndex}.wordNative`}
                                    />
                                </Paper>
                            )}
                            <div className={classes.actions}>
                                <IconButton
                                    color="inherit"
                                    aria-label="Remove"
                                    disabled={levelPacks[levelPackIndex].wordPairs.length < 2}
                                    className={classes.button}
                                    onClick={handleWordPairDeletion(levelPackIndex)}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="Add"
                                    className={classes.button}
                                    onClick={handleWordPairAddition(levelPackIndex)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                        </Paper>)}
                    <div className={classes.actions}>
                        <IconButton
                            color="inherit"
                            aria-label="Remove"
                            disabled={levelPacks.length < 2}
                            className={classes.button}
                            onClick={handleLevelPackDeletion}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="Add"
                            className={classes.button}
                            onClick={handleLevelPackAddition}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className={classes.actions}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Создать
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}

GamePackCreationPage.propTypes = {
    descriptionValues: PropTypes.shape({
        firstTitle: PropTypes.string.isRequired,
        secondTitle: PropTypes.string.isRequired,
        firstDescription: PropTypes.string.isRequired,
        secondDescription: PropTypes.string.isRequired
    }).isRequired,
    handleDescriptionValuesChange: PropTypes.func.isRequired,
    levelPacks: PropTypes.arrayOf(
        PropTypes.shape({
            level: PropTypes.number.isRequired,
            wordPairs: PropTypes.arrayOf(
                PropTypes.shape({
                    wordPairNumber: PropTypes.number.isRequired
                }).isRequired
            ).isRequired
        }).isRequired
    ).isRequired,
    handleLevelPackAddition: PropTypes.func.isRequired,
    handleLevelPackDeletion: PropTypes.func.isRequired,
    handleWordPairAddition: PropTypes.func.isRequired,
    handleWordPairDeletion: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GamePackCreationPage);
