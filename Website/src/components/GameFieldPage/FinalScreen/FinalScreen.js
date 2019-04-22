import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/index';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton/index';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ReplayIcon from '@material-ui/icons/Replay';
import FastForwardIcon from '@material-ui/icons/FastForward';
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
    },
    text: {
        textAlign: 'center',
    }
});

function FinalScreen({ score = null, handleReplay, handleRedirectionToLevels, handleRedirectionToNextLevel, classes }) {
    return (
        <div className={classes.root}>
            <Zoom in>
                <div className={classes.shell}>
                    {score !== null &&
                    <Typography gutterBottom>
                        <StarIcon fontSize="large" color={score > 0 ? 'secondary' : 'disabled'} />
                        <StarIcon fontSize="large" color={score > 1 ? 'secondary' : 'disabled'} />
                        <StarIcon fontSize="large" color={score > 2 ? 'secondary' : 'disabled'} />
                    </Typography>}
                    <Typography>
                        <IconButton aria-label="ViewModule" onClick={handleRedirectionToLevels}>
                            <ViewModuleIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Replay" onClick={handleReplay}>
                            <ReplayIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" aria-label="ArrowForward" onClick={handleRedirectionToNextLevel}>
                            <FastForwardIcon fontSize="large" />
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
    handleRedirectionToLevels: PropTypes.func.isRequired,
    handleRedirectionToNextLevel: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FinalScreen);
