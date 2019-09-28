import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import TrainingResult from 'components/TrainingResult';

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12
  }
}))(Tooltip);

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    maxWidth: theme.spacing(64)
  },
  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 8, 2, 2)
  },
  next: {
    position: 'absolute',
    top: '50%',
    right: theme.spacing(1),
    transform: 'translateY(-50%)'
  },
  button: {
    marginBottom: theme.spacing(1),
    textTransform: 'none'
  },
  buttonWithIcon: {
    paddingRight: theme.spacing(5),
    transition: theme.transitions.create('padding-right', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest
    })
  },
  '@keyframes fade': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  buttonIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    animation: `$fade ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeOut}`
  }
}));

function SelectTranslateTraining({
  currentWordSet,
  rightSelectedWordId,
  wrongSelectedWordId,
  isClickDone,
  isGameCompleted,
  isResultReady,
  handleClick,
  handleOpenNextSet,
  ...rest
}) {
  const classes = useStyles();

  const {
    primaryWordInfo: { word: primaryWord },
    secondaryWordsInfo
  } = currentWordSet;

  if (!isResultReady) {
    return (
      <Fade in={!isGameCompleted}>
        <div className={classes.root}>
          <Paper className={classes.header}>
            <Typography component="span" variant="h6">
              {primaryWord}
            </Typography>
            <IconButton
              aria-label="next"
              onClick={handleOpenNextSet}
              disabled={!isClickDone}
              className={classes.next}
            >
              <PlayArrowIcon aria-label="next word" />
            </IconButton>
          </Paper>
          {secondaryWordsInfo.map(({ id, pairId, word, translation }) => {
            let icon;
            if (id === rightSelectedWordId) {
              icon = <CheckCircleOutlineIcon className={classes.buttonIcon} />;
            } else if (id === wrongSelectedWordId) {
              icon = <ErrorOutlineIcon className={classes.buttonIcon} />;
            }

            let color;
            switch (id) {
              case rightSelectedWordId:
                color = 'primary';
                break;
              case wrongSelectedWordId:
                color = 'secondary';
                break;
              default:
                color = 'default';
            }

            return (
              <LightTooltip
                key={id}
                title={translation}
                disableTouchListener
                disableFocusListener={!isClickDone}
                disableHoverListener={!isClickDone}
                placement="right"
              >
                <Button
                  onClick={handleClick(pairId, id)}
                  disableRipple
                  color={color}
                  variant="outlined"
                  fullWidth
                  className={clsx(classes.button, {
                    [classes.buttonWithIcon]: Boolean(icon)
                  })}
                >
                  {word}
                  {icon}
                </Button>
              </LightTooltip>
            );
          })}
        </div>
      </Fade>
    );
  } else {
    return <TrainingResult {...rest} />;
  }
}

SelectTranslateTraining.propTypes = {
  currentWordSet: PropTypes.shape({
    primaryWordInfo: PropTypes.shape({
      word: PropTypes.string.isRequired
    }).isRequired,
    secondaryWordsInfo: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
        pairId: PropTypes.number.isRequired,
        word: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  }).isRequired,
  rightSelectedWordId: PropTypes.number.isRequired,
  wrongSelectedWordId: PropTypes.number.isRequired,
  isClickDone: PropTypes.bool.isRequired,
  isGameCompleted: PropTypes.bool.isRequired,
  isResultReady: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleOpenNextSet: PropTypes.func.isRequired,
  score: PropTypes.number,
  handleReplay: PropTypes.func
};

export default SelectTranslateTraining;
