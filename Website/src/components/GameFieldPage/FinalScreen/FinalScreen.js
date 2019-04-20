import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/index';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton/index';
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Zoom from '@material-ui/core/Zoom/index';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shell: {
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit * 2,
    },
    text: {
        textAlign: 'center',
    }
});

function FinalScreen({ score = null, handleReplay, handleRedirectionToNextLevel, classes }) {
    return (
        <div className={classes.root}>
            <Zoom in>
                <div className={classes.shell}>
                    <Typography
                        variant="h4"
                        color="secondary"
                        gutterBottom
                        className={classes.text}
                    >
                        WINNER WINNER CHICKEN DINNER!
                    </Typography>
                    {score !== null &&
                    <Typography gutterBottom>
                        <StarIcon fontSize="large" color={score > 0 ? 'secondary' : 'disabled'} />
                        <StarIcon fontSize="large" color={score > 1 ? 'secondary' : 'disabled'} />
                        <StarIcon fontSize="large" color={score > 2 ? 'secondary' : 'disabled'} />
                    </Typography>}
                    <Typography>
                        <IconButton aria-label="Replay" onClick={handleReplay}>
                            <ReplayIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" aria-label="ArrowForward" onClick={handleRedirectionToNextLevel}>
                            <ArrowForwardIcon fontSize="large" />
                        </IconButton>
                    </Typography>
                </div>
            </Zoom>
        </div>
    );
}

FinalScreen.propTypes = {
    score: PropTypes.number,
    handleReplay: PropTypes.func.isRequired,
    handleRedirectionToNextLevel: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FinalScreen);
