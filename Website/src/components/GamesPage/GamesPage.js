import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import LearningGames from './LearningGames';
import SandboxGames from './SandboxGames';
import GamePackAddButton from './GamePackAddButton';

const styles = theme => ({
    root: {
        [theme.breakpoints.up(1100 + 240 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    tabContainer: {
        paddingTop: theme.spacing.unit * 3,
    },
});

function GamesPage({ value, handleChange, classes }) {
    return (
        <div className={classes.root}>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Обучение" />
                    <Tab label="Песочница" />
                </Tabs>
            </Paper>
            {value === 0 &&
            <div className={classes.tabContainer}>
                <LearningGames />
            </div>}
            {value === 1 &&
            <div className={classes.tabContainer}>
                <SandboxGames />
            </div>}
            <GamePackAddButton visible={value === 1} />
        </div>
    );
}

GamesPage.propTypes = {
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GamesPage);
