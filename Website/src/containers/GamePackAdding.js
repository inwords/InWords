import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GameActions } from '../actions/GameActions';

class GamePackAdding extends Component {
    static propTypes = {
        addGamePack: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired
    };

    state = {
        descriptions: [{
            langId: 1,
            title: "",
            description: ""
        }],
        levelPacks: [{
            level: 1,
            wordTranslations: [{
                wordForeign: "",
                wordNative: ""
            }]
        }]
    };

    handleChangeDescriptionsTitle = (sourceIndex) => (event) => {
        const newDescriptions = this.state.descriptions.map((description, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return description;
            };

            return { ...description, title: event.target.value };
        });

        this.setState({
            descriptions: newDescriptions
        });
    };

    handleChangeDescriptionsDescription = (sourceIndex) => (event) => {
        const newDescriptions = this.state.descriptions.map((description, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return description;
            };

            return { ...description, description: event.target.value };
        });

        this.setState({
            descriptions: newDescriptions
        });
    };

    handleAddDescription = () => {
        this.setState({
            descriptions: this.state.descriptions.concat({
                langId: this.state.descriptions.length + 1, title: "", description: ""
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
                wordTranslations: [{ wordForeign: "", wordNative: "" }]
            })
        });
    };

    handleDelLevelPack = () => {
        this.setState({
            levelPacks: this.state.levelPacks.slice(0, -1)
        });
    };

    handleChangeWordForeign = (sourceLevelPackIndex, sourceWordTranslationIndex) => (event) => {
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
                    wordForeign: event.target.value
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

    handleChangeWordNative = (sourceLevelPackIndex, sourceWordTranslationIndex) => (event) => {
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
                    wordNative: event.target.value
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

    handleAddWordTranslation = (sourceIndex) => {
        const newLevelPacks = this.state.levelPacks.map((levelPack, destinationIndex) => {
            if (sourceIndex !== destinationIndex) {
                return levelPack;
            };

            return {
                ...levelPack, wordTranslations: levelPack.wordTranslations.concat({
                    wordForeign: "",
                    wordNative: ""
                })
            };
        });

        this.setState({
            levelPacks: newLevelPacks
        });
    };

    handleDelWordTranslation = (sourceIndex) => {
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

    handleSubmit = (event) => {
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

        event.preventDefault();
        //this.props.handleCancel();
    };

    render() {
        const { handleCancel } = this.props;
        const { descriptions, levelPacks } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h2 className="text-center">Экспериментальная версия!</h2>
                <h4 className="text-center">Работает не стабильно!</h4>
                {descriptions.map((description, index) =>
                    <Fragment key={index}>
                        <h5 className="font-weight-bold">Описание {index + 1}</h5>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-sm" required="required" placeholder="Название"
                                value={description.title} onChange={this.handleChangeDescriptionsTitle(index)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-sm" placeholder="Описание"
                                value={description.description} onChange={this.handleChangeDescriptionsDescription(index)} />
                        </div>
                    </Fragment>
                )}
                <div className="form-group">
                    <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-outline-primary"
                            onClick={this.handleAddDescription}>Добавить описание</button>
                        <button type="button" className="btn btn-outline-primary"
                            onClick={this.handleDelDescription}>Удалить описание</button>
                    </div>
                </div>
                {levelPacks.map((levelPack, levelPackIndex) =>
                    <Fragment key={levelPackIndex}>
                        <h5 className="font-weight-bold">Уровень {levelPackIndex + 1}</h5>
                        <div className="container">
                            {levelPack.wordTranslations.map((wordTranslation, wordTranslationIndex) =>
                                <Fragment key={wordTranslationIndex}>
                                    <h6 className="font-weight-bold">Пара слов {wordTranslationIndex + 1}</h6>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-sm" required="required" placeholder="Слово или фраза"
                                            value={wordTranslation.wordForeign} onChange={this.handleChangeWordForeign(levelPackIndex, wordTranslationIndex)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-sm" placeholder="Перевод"
                                            value={wordTranslation.wordNative} onChange={this.handleChangeWordNative(levelPackIndex, wordTranslationIndex)} />
                                    </div>
                                </Fragment>
                            )}
                            <div className="form-group">
                                <div className="btn-group btn-group-sm" role="group">
                                    <button type="button" className="btn btn-outline-primary"
                                        onClick={() => this.handleAddWordTranslation(levelPackIndex)}>Добавить пару слов</button>
                                    <button type="button" className="btn btn-outline-primary"
                                        onClick={() => this.handleDelWordTranslation(levelPackIndex)}>Удалить пару слов</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
                <div className="form-group">
                    <div className="btn-group btn-group-sm" role="group">
                        <button type="button" className="btn btn-outline-primary"
                            onClick={this.handleAddLevelPack}>Добавить уровень</button>
                        <button type="button" className="btn btn-outline-primary"
                            onClick={this.handleDelLevelPack}>Удалить уровень</button>
                    </div>
                </div>
                <div className="btn-group" role="group">
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                    <button type="button" className="btn btn-outline-primary"
                        onClick={handleCancel}>Отменить</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userInfo: store.user.userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGamePack: (gamePack) => dispatch(GameActions.addGamePack(gamePack))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamePackAdding);
