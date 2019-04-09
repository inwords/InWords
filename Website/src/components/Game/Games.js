import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useTabsBehaviour from '../../logic-hooks/useTabsBehaviour';
import LearningGamesContainer from '../../containers/Game/LearningGamesContainer';
import SandboxGamesContainer from '../../containers/Game/SandboxGamesContainer';
import PageContentContainer from '../PageContentContainer';

const styles = theme => ({
    tabContainer: {
        paddingTop: theme.spacing.unit * 3,
    },
});

function Games({ classes }) {
    const [value, handleChange] = useTabsBehaviour();

    return (
        <PageContentContainer>
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
                    <LearningGamesContainer />
                </div>}
            {value === 1 &&
                <div className={classes.tabContainer}>
                    <SandboxGamesContainer />
                </div>}
        </PageContentContainer >
    );
}

Games.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Games);
