import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import { AppBarContext } from '../TopAppBar/AppBarContext';
import useForm from '../../hooks/useForm';
import UpwardButton from '../shared/UpwardButton';
import GamePackCreationPage from './GamePackCreationPage';

function GamePackCreationContainer({ userId, addGamePack }) {
    const { resetAppBar } = React.useContext(AppBarContext);

    React.useEffect(() => {
        resetAppBar({
            title: 'Создание',
            leftElement: <UpwardButton />
        });
    }, []);

    const { values: descriptionValues, handleChange: handleDescriptionValuesChange } = useForm({
        firstTitle: '',
        secondTitle: '',
        firstDescription: '',
        secondDescription: ''
    });

    const [levelPacks, setLevelPacks] = React.useState([{
        level: 1,
        wordPairs: [{ wordPairNumber: 1 }]
    }]);

    const handleLevelPackAddition = () => {
        setLevelPacks(levelPacks.concat({
            level: levelPacks.length + 1,
            wordPairs: [{ wordPairNumber: 1 }]
        }));
    };

    const handleLevelPackDeletion = () => {
        setLevelPacks(levelPacks.slice(0, -1));
    };

    const handleWordPairAddition = sourceIndex => () => {
        const newLevelPacks = levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            }

            return {
                ...levelPack,
                wordPairs: levelPack.wordPairs.concat({
                    wordPairNumber: levelPacks[sourceIndex].wordPairs.length + 1
                })
            };
        });

        setLevelPacks(newLevelPacks);
    };

    const handleWordPairDeletion = sourceIndex => () => {
        const newLevelPacks = levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            }

            return {
                ...levelPack,
                wordPairs: levelPack.wordPairs.slice(0, -1)
            };
        });

        setLevelPacks(newLevelPacks);
    };

    const handleSubmit = event => {
        addGamePack({
            creationInfo: {
                creatorId: userId,
                descriptions: [{
                    langId: 1,
                    title: descriptionValues.firstTitle,
                    description: descriptionValues.firstDescription
                }, {
                    langId: 2,
                    title: descriptionValues.secondTitle,
                    description: descriptionValues.secondDescription
                }]
            },
            levelPacks: levelPacks.map((levelPack, levelPackIndex) => {
                return {
                    level: levelPack.level,
                    wordTranslations: levelPacks[levelPackIndex].wordPairs.map((wordPair, wordPairIndex) => {
                        return {
                            wordForeign: event.target.elements[`${levelPackIndex}.${wordPairIndex}.wordForeign`].value,
                            wordNative: event.target.elements[`${levelPackIndex}.${wordPairIndex}.wordNative`].value
                        }
                    })
                }
            })
        });

        event.preventDefault();
    };

    return (
        <GamePackCreationPage
            descriptionValues={descriptionValues}
            handleDescriptionValuesChange={handleDescriptionValuesChange}
            levelPacks={levelPacks}
            handleLevelPackAddition={handleLevelPackAddition}
            handleLevelPackDeletion={handleLevelPackDeletion}
            handleWordPairAddition={handleWordPairAddition}
            handleWordPairDeletion={handleWordPairDeletion}
            handleSubmit={handleSubmit}
        />
    );
}

GamePackCreationContainer.propTypes = {
    userId: PropTypes.number,
    addGamePack: PropTypes.func.isRequired
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addGamePack: gamePack => dispatch(gameApiActions.addGamePack(gamePack))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePackCreationContainer);
