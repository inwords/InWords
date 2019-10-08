import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import LightTooltip from 'components/LightTooltip';

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
    textTransform: 'none',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      '@media (hover: none)': {
        backgroundColor: theme.palette.background.paper
      }
    }
  },
  buttonWithIcon: {
    paddingRight: theme.spacing(5),
    transition: theme.transitions.create(['padding-right', 'border-color'], {
      easing: theme.transitions.easing.easeOut,
      duration: 200
    })
  },
  '@keyframes fade': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  buttonIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    animation: `$fade 200ms ${theme.transitions.easing.easeOut}`
  }
}));

function SelectTranslateTraining({
  currentWordSet: {
    primaryWordInfo: { word: primaryWord },
    secondaryWordsInfo
  } = {
    primaryWordInfo: {
      word: ''
    },
    secondaryWordsInfo: []
  },
  requiredWordIdsInfo: { rightSelectedWordId, wrongSelectedWordId },
  selectedWordId,
  isClickDone,
  handleClick,
  handleNext,
  isGameCompleted
}) {
  const classes = useStyles();

  return (
    <Fade in={!isGameCompleted}>
      <div className={classes.root}>
        <Paper className={classes.header}>
          <Typography component="span" variant="h6">
            {primaryWord}
          </Typography>
          <IconButton
            aria-label="next"
            onClick={handleNext}
            disabled={!isClickDone}
            className={classes.next}
          >
            <PlayArrowIcon aria-label="next word" />
          </IconButton>
        </Paper>
        {secondaryWordsInfo.map(({ id, pairId, word, translation }) => {
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

          let icon;
          if (id === rightSelectedWordId) {
            icon = <CheckCircleOutlineIcon className={classes.buttonIcon} />;
          } else if (id === wrongSelectedWordId) {
            icon = <ErrorOutlineIcon className={classes.buttonIcon} />;
          }

          return (
            <LightTooltip
              key={id}
              title={translation}
              open={id === selectedWordId}
              placement="right"
            >
              <Button
                onClick={handleClick(pairId, id)}
                disableRipple
                fullWidth
                color={color}
                variant="outlined"
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
  }),
  requiredWordIdsInfo: PropTypes.exact({
    rightSelectedWordId: PropTypes.number,
    wrongSelectedWordId: PropTypes.number
  }).isRequired,
  selectedWordId: PropTypes.number.isRequired,
  isClickDone: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  isGameCompleted: PropTypes.bool.isRequired
};

export default SelectTranslateTraining;
