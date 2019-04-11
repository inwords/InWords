import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import Wordlist from '../../components/Wordlist/Wordlist';

function WordlistContainer({ wordPairs, pullWordPairs }) {
    useEffect(() => {
        if (!wordPairs.length) {
            pullWordPairs();
        }
    }, []);

    const [checked, setChecked] = useState([]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        setChecked([]);
    }, [wordPairs]);

    return (
        <Wordlist
            wordPairs={[...wordPairs].reverse()}
            checked={checked}
            handleToggle={handleToggle}
        />
    );
}

WordlistContainer.propTypes = {
    wordPairs: PropTypes.array.isRequired,
    pullWordPairs: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
    return {
        wordPairs: store.wordPairs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pullWordPairs: () => dispatch(wordlistApiActions.pullWordPairs())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WordlistContainer);
