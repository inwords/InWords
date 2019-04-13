import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wordlistApiActions from '../../../actions/wordPairsApiActions';
import Wordlist from './WordlistPage';
import useCheckboxListBehaviour from '../../../hooks/useCheckboxListBehaviour';

function WordlistPageContainer({ wordPairs, pullWordPairs }) {
    React.useEffect(() => {
        if (!wordPairs.length) {
            pullWordPairs();
        }
    }, []);

    const [checked, handleToggle, handleReset] = useCheckboxListBehaviour();

    React.useEffect(() => {
        handleReset();
    }, [wordPairs]);

    return (
        <Wordlist
            wordPairs={[...wordPairs].reverse()}
            checked={checked}
            handleToggle={handleToggle}
            handleReset={handleReset}
        />
    );
}

WordlistPageContainer.propTypes = {
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
)(WordlistPageContainer);
