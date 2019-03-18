import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function GamePackAdding({ descriptions, levelPacks, handleChangeDescriptions, handleChangeWordTranslations, handleAddDescription,
    handleDelDescription, handleAddLevelPack, handleDelLevelPack, handleAddWordTranslation, handleDelWordTranslation,
    handleSubmit, handleCancel }) {
    return (
        <form onSubmit={handleSubmit}>
            <ul className="list-group">
                {descriptions.map((description, index) =>
                    <li className="list-group-item mb-3" key={index}>
                        <h5 className="font-weight-bold">Описание {index + 1}</h5>
                        <input type="text" className="form-control form-control-sm mb-2" required="required" placeholder="Название"
                            value={description.title} onChange={handleChangeDescriptions(index, "title")} />
                        <textarea className="form-control form-control-sm" placeholder="Описание"
                            value={description.description} onChange={handleChangeDescriptions(index, "description")} />
                    </li>
                )}
            </ul>
            <div className="btn-group btn-group-sm mb-3" role="group">
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleAddDescription}>Добавить описание</button>
                {descriptions.length > 1 ?
                    <button type="button" className="btn btn-outline-danger"
                        onClick={handleDelDescription}>Удалить описание</button>
                    : <Fragment />}
            </div>
            <ul className="list-group">
                {levelPacks.map((levelPack, levelPackIndex) =>
                    <li className="list-group-item mb-3" key={levelPackIndex}>
                        <h5 className="font-weight-bold">Уровень {levelPackIndex + 1}</h5>
                        {levelPack.wordTranslations.map((wordTranslation, wordTranslationIndex) =>
                            <div className="input-group input-group-sm mb-2" key={wordTranslationIndex}>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">{wordTranslationIndex + 1}</span>
                                </div>
                                <input type="text" className="form-control" required="required" placeholder="Слово или фраза"
                                    value={wordTranslation.wordForeign} onChange={handleChangeWordTranslations(levelPackIndex, wordTranslationIndex, "wordForeign")} />
                                <input type="text" className="form-control" required="required" placeholder="Перевод"
                                    value={wordTranslation.wordNative} onChange={handleChangeWordTranslations(levelPackIndex, wordTranslationIndex, "wordNative")} />
                            </div>
                        )}
                        <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-outline-primary"
                                onClick={() => handleAddWordTranslation(levelPackIndex)}>Добавить пару слов</button>
                            {levelPacks[levelPackIndex].wordTranslations.length > 1 ?
                                <button type="button" className="btn btn-outline-danger"
                                    onClick={() => handleDelWordTranslation(levelPackIndex)}>Удалить пару слов</button>
                                : <Fragment />}
                        </div>
                    </li>
                )}
            </ul>
            <div className="btn-group btn-group-sm mb-3" role="group">
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleAddLevelPack}>Добавить уровень</button>
                {levelPacks.length > 1 ?
                    <button type="button" className="btn btn-outline-danger"
                        onClick={handleDelLevelPack}>Удалить уровень</button>
                    : <Fragment />}
            </div>
            <br />
            <div className="btn-group" role="group">
                <button type="submit" className="btn btn-primary">Сохранить</button>
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleCancel}>Отменить</button>
            </div>
        </form>
    );
}

GamePackAdding.propTypes = {
    descriptions: PropTypes.array.isRequired,
    levelPacks: PropTypes.array.isRequired,
    handleChangeDescriptions: PropTypes.func.isRequired,
    handleChangeWordTranslations: PropTypes.func.isRequired,
    handleAddDescription: PropTypes.func.isRequired,
    handleDelDescription: PropTypes.func.isRequired,
    handleAddLevelPack: PropTypes.func.isRequired,
    handleDelLevelPack: PropTypes.func.isRequired,
    handleAddWordTranslation: PropTypes.func.isRequired,
    handleDelWordTranslation: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default GamePackAdding;
