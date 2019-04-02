import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gameApiActions from '../../actions/gameApiActions';
import GamePackAdding from '../../components/Game/GamePackAdding';

class GamePackAddingContainer extends Component {
    static propTypes = {
        gamesInfo: PropTypes.array.isRequired,
        addGamePack: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired
    };

    state = {
        descriptions: [{
            langId: 1,
            title: '',
            description: ''
        }],
        levelPacks: [{
            level: 1,
            wordTranslations: [{
                wordForeign: '',
                wordNative: ''
            }]
        }]
    };

    componentDidUpdate(prevProps) {
        if (this.props.gamesInfo !== prevProps.gamesInfo) {
            this.props.handleCancel();
        }
    }

    handleChangeDescriptions = (sourceIndex, propertyName) => (e) => {
        const newDescriptions = this.state.descriptions.map((description, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return description;
            };

            return { ...description, [propertyName]: e.target.value };
        });

        this.setState({
            descriptions: newDescriptions
        });
    };

    handleAddDescription = () => {
        this.setState({
            descriptions: this.state.descriptions.concat({
                langId: this.state.descriptions.length + 1, title: '', description: ''
            })
        });
    };

    handleDelDescription = () => {
        this.setState({
            descriptions: this.state.descriptions.slice(0, -1)
        });
    };

    handleAddLevelPack = () => {
        this.setState({
            levelPacks: this.state.levelPacks.concat({
                level: this.state.levelPacks.length + 1,
                wordTranslations: [{ wordForeign: '', wordNative: '' }]
            })
        });
    };

    handleDelLevelPack = () => {
        this.setState({
            levelPacks: this.state.levelPacks.slice(0, -1)
        });
    };

    handleChangeWordTranslations = (sourceLevelPackIndex, sourceWordTranslationIndex, propertyName) => (e) => {
        const newLevelPacks = this.state.levelPacks.map((levelPack, destinationLevelPackIndex) => {
            if (sourceLevelPackIndex !== destinationLevelPackIndex) {
                return levelPack;
            };

            const newWordTranslations = levelPack.wordTranslations.map((wordTranslation, destinationWordTranslationIndex) => {
                if (sourceWordTranslationIndex !== destinationWordTranslationIndex) {
                    return wordTranslation;
                };

                return {
                    ...wordTranslation,
                    [propertyName]: e.target.value
                };
            });

            return {
                ...levelPack,
                wordTranslations: newWordTranslations
            };
        });

        this.setState({
            levelPacks: newLevelPacks
        });
    };

    handleAddWordTranslation = (sourceIndex) => () => {
        const newLevelPacks = this.state.levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            };

            return {
                ...levelPack, wordTranslations: levelPack.wordTranslations.concat({
                    wordForeign: '',
                    wordNative: ''
                })
            };
        });

        this.setState({
            levelPacks: newLevelPacks
        });
    };

    handleDelWordTranslation = (sourceIndex) => () => {
        const newLevelPacks = this.state.levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            };

            return {
                ...levelPack,
                wordTranslations: levelPack.wordTranslations.slice(0, -1)
            };
        });

        this.setState({
            levelPacks: newLevelPacks
        });
    };

    handleSubmit = (e) => {
        this.props.addGamePack({
            CreationInfo: {
                Descriptions: this.state.descriptions.map((description) => {
                    return {
                        LangID: description.langId,
                        Title: description.title,
                        Description: description.description
                    }
                })
            },
            LevelPacks: this.state.levelPacks.map((levelPack) => {
                return {
                    Level: levelPack.level,
                    WordTranslations: levelPack.wordTranslations.map((wordTranslation) => {
                        return {
                            WordForeign: wordTranslation.wordForeign,
                            WordNative: wordTranslation.wordNative
                        }
                    })
                }
            })
        });

        e.preventDefault();
    };

    render() {
        const { handleCancel } = this.props;
        const { descriptions, levelPacks } = this.state;

        return (
            <GamePackAdding
                descriptions={descriptions}
                levelPacks={levelPacks}
                handleChangeDescriptions={this.handleChangeDescriptions}
                handleChangeWordTranslations={this.handleChangeWordTranslations}
                handleAddDescription={this.handleAddDescription}
                handleDelDescription={this.handleDelDescription}
                handleAddLevelPack={this.handleAddLevelPack}
                handleDelLevelPack={this.handleDelLevelPack}
                handleAddWordTranslation={this.handleAddWordTranslation}
                handleDelWordTranslation={this.handleDelWordTranslation}
                handleSubmit={this.handleSubmit}
                handleCancel={handleCancel}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        gamesInfo: store.game.gamesInfo,
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGamePack: (gamePack) => dispatch(gameApiActions.addGamePack(gamePack))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePackAddingContainer);
