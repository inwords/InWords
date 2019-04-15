import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordlistApiActions from '../../actions/wordPairsApiActions';
import { AppBarContext } from '../../contexts/AppBarContext';
import usePrevious from '../../hooks/usePrevious';
import WordPairsUncheckButton from './WordPairsUncheckButton';
import WordPairsDeleteButton from './WordPairsDeleteButton';
import Wordlist from './WordlistPage';

function WordlistPageContainer({ wordPairs, pullWordPairs }) {
    React.useEffect(() => {
        if (!wordPairs.length) {
            pullWordPairs();
        }
    }, []);

    const [checked, setChecked] = React.useState([]);

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

    React.useEffect(() => {
        setChecked([]);
    }, [wordPairs]);

    const { customizeAppBar, resetAppBar } = React.useContext(AppBarContext);

    const prevChecked = usePrevious(checked);

    React.useEffect(() => {
        if (checked.length) {
            if (!prevChecked.length) {
                resetAppBar({
                    title: `Выбрано: ${checked.length}`,
                    color: 'secondary',
                    leftElements: <WordPairsUncheckButton handleUncheck={() => setChecked([])} />,
                    rightElements: <WordPairsDeleteButton checked={checked} />,
                });
            } else {
                customizeAppBar({ title: `Выбрано: ${checked.length}` });
            }
        } else {
            resetAppBar({ title: 'Словарь' });
        }
    }, [checked]);

    return (
        <Wordlist
            wordPairs={[...wordPairs].reverse()}
            checked={checked}
            handleToggle={handleToggle}
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
