import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../actions/wordlistApiActions';
import Wordlist from '../../components/Wordlist/Wordlist';
import WordPairDeletionToolbar from '../../components/Wordlist/WordPairDeletionToolbar';
import { AppBarContext } from '../../contexts/AppBarContext';

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

    const { customizeAppBar, resetAppBar } = React.useContext(AppBarContext);

    useEffect(() => {
        if (checked.length) {
            customizeAppBar({title: `Выбрано: ${checked.length}`, color: 'default', toolbar: <WordPairDeletionToolbar />})
        } else {
            resetAppBar({title: 'Словарь'})
        }
    }, [checked]);

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
