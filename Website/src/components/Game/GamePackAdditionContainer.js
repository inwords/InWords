import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GamePackAddition from './GamePackAddition';

function GamePackAdditionContainer({ visible, userId, addGamePack }) {
    const [descriptionValues, setDescriptionValues] = useState({
        title: '',
        description: ''
    });

    const handleDescriptionValuesChange = prop => event => {
        setDescriptionValues({ ...descriptionValues, [prop]: event.target.value });
    };

    const [levelPacks, setLevelPacks] = useState([{
        level: 1,
        wordTranslations: [{
            wordForeign: '',
            wordNative: ''
        }]
    }]);

    const handleLevelPackAddition = () => {
        setLevelPacks(levelPacks.concat({
            level: levelPacks.length + 1,
            wordTranslations: [{ wordForeign: '', wordNative: '' }]
        }));
    };

    const handleLevelPackDeletion = () => {
        setLevelPacks(levelPacks.slice(0, -1));
    };

    const handleWordTranslationsChange = (sourceLevelPackIndex, sourceWordTranslationIndex, prop) => event => {
        const newLevelPacks = levelPacks.map((levelPack, destinationLevelPackIndex) => {
            if (sourceLevelPackIndex !== destinationLevelPackIndex) {
                return levelPack;
            }

            const newWordTranslations = levelPack.wordTranslations.map((wordTranslation, destinationWordTranslationIndex) => {
                if (sourceWordTranslationIndex !== destinationWordTranslationIndex) {
                    return wordTranslation;
                }

                return {
                    ...wordTranslation,
                    [prop]: event.target.value
                };
            });

            return {
                ...levelPack,
                wordTranslations: newWordTranslations
            };
        });

        setLevelPacks(newLevelPacks);
    };

    const handleWordTranslationAddition = sourceIndex => () => {
        const newLevelPacks = levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            }

            return {
                ...levelPack,
                wordTranslations: levelPack.wordTranslations.concat({
                    wordForeign: '',
                    wordNative: ''
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

    const handleReset = () => {
        setDescriptionValues({
            title: '',
            description: ''
        });

        setLevelPacks([{
            level: 1,
            wordTranslations: [{
                wordForeign: '',
                wordNative: ''
            }]
        }]);
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
            levelPacks: levelPacks
        });

        event.preventDefault();
    };

    return (
        <GamePackAddition
            visible={visible}
            descriptionValues={descriptionValues}
            handleDescriptionValuesChange={handleDescriptionValuesChange}
            levelPacks={levelPacks}
            handleLevelPackAddition={handleLevelPackAddition}
            handleLevelPackDeletion={handleLevelPackDeletion}
            handleWordTranslationsChange={handleWordTranslationsChange}
            handleWordTranslationAddition={handleWordTranslationAddition}
            handleWordTranslationDeletion={handleWordTranslationDeletion}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
        />
    );
}

GamePackAdditionContainer.propTypes = {
    userId: PropTypes.number.isRequired,
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
)(GamePackAdditionContainer);
