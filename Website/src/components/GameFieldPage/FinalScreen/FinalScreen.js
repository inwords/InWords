import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton/index';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ReplayIcon from '@material-ui/icons/Replay';
import FastForwardIcon from '@material-ui/icons/FastForward';
import Zoom from '@material-ui/core/Zoom/index';
import Smiley from './Smiley';

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 2,
        textAlign: 'center',
    },
    smiley: {
        marginBottom: theme.spacing.unit,
    },
    stars: {
        marginBottom: theme.spacing.unit,
    },
});

function FinalScreen({ score = null, handleReplay, handleRedirectionToLevels, handleRedirectionToNextLevel, classes }) {
    return (
            <Zoom in>
                <div className={classes.container}>
                    {score !== null && (
                        <>
                            <div className={classes.smiley}>
                                <Smiley score={score} />
                            </div>
                            <div className={classes.stars}>
                                <StarIcon fontSize="large" color={score > 0 ? 'secondary' : 'disabled'} />
                                <StarIcon fontSize="large" color={score > 1 ? 'secondary' : 'disabled'} />
                                <StarIcon fontSize="large" color={score > 2 ? 'secondary' : 'disabled'} />
                            </div>
                        </>)}
                    <div>
                        <IconButton aria-label="ViewModule" onClick={handleRedirectionToLevels}>
                            <ViewModuleIcon fontSize="large" />
                        </IconButton>
                        <IconButton aria-label="Replay" onClick={handleReplay}>
                            <ReplayIcon fontSize="large" />
                        </IconButton>
                        <IconButton color="primary" aria-label="FastForward" onClick={handleRedirectionToNextLevel}>
                            <FastForwardIcon fontSize="large" />
                        </IconButton>
                    </div>
                </div>
            </Zoom>
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
