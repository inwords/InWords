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
            leftElement: <UpwardButton />,
        });
    }, []);

    const { values: descriptionValues, handleChange: handleDescriptionValuesChange } = useForm({
        title: '',
        description: ''
    });

    const [levelPacks, setLevelPacks] = React.useState([{
        level: 1,
        wordTranslations: [{
            defaultWordForeign: '',
            defaultWordNative: ''
        }]
    }]);

    const handleLevelPackAddition = () => {
        setLevelPacks(levelPacks.concat({
            level: levelPacks.length + 1,
            wordTranslations: [{
                defaultWordForeign: '',
                defaultWordNative: ''
            }]
        }));
    };

    const handleLevelPackDeletion = () => {
        setLevelPacks(levelPacks.slice(0, -1));
    };

    const handleWordTranslationAddition = sourceIndex => () => {
        const newLevelPacks = levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            }

            return {
                ...levelPack,
                wordTranslations: levelPack.wordTranslations.concat({
                    defaultWordForeign: '',
                    defaultWordNative: ''
                })
            };
        });

        setLevelPacks(newLevelPacks);
    };

    const handleWordTranslationDeletion = sourceIndex => () => {
        const newLevelPacks = levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            }

            return {
                ...levelPack,
                wordTranslations: levelPack.wordTranslations.slice(0, -1)
            };
        });

        setLevelPacks(newLevelPacks);
    };

    const handleSubmit = event => {
        addGamePack({
            creationInfo: {
                creatorId: userId,
                descriptions: [{
                    langID: 1,
                    title: descriptionValues.title,
                    description: descriptionValues.description
                }]
            },
            levelPacks: levelPacks.map((levelPack, levelPackIndex) => {
                return {
                    level: levelPack.level,
                    wordTranslations: levelPacks[levelPackIndex].wordTranslations.map((wordTranslation, wordTranslationIndex) => {
                        return {
                            wordForeign: event.target.elements[`${levelPackIndex}.${wordTranslationIndex}.wordForeign`].value,
                            wordNative: event.target.elements[`${levelPackIndex}.${wordTranslationIndex}.wordNative`].value
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
            handleWordTranslationAddition={handleWordTranslationAddition}
            handleWordTranslationDeletion={handleWordTranslationDeletion}
            handleSubmit={handleSubmit}
        />
    );
}

GamePackCreationContainer.propTypes = {
    userId: PropTypes.number,
    addGamePack: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
    return {
        userId: store.access.userId,
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
