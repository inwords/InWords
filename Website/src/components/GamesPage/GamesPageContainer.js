import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import GamesPage from './GamesPage';

function GamesPageContainer({ location, history, match }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({ title: 'Игры' });
    }, []);

    const [value, setValue] = React.useState(parseInt(match.params.value));

    const handleChange = (event, value) => {
        setValue(value);
        history.push(`/games/${value}`)
    };

    React.useEffect(() => {
        setValue(parseInt(match.params.value));
    }, [location.pathname]);

    return (
        <GamesPage
            value={value}
            handleChange={handleChange}
        />
    );
}

GamesPageContainer.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default withRouter(GamesPageContainer);
