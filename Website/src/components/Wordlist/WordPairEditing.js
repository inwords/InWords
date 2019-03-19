import React from 'react';
import PropTypes from 'prop-types';

function WordPairEditing({ wordForeign, wordNative, handleChange, handleSubmit, handleCancel }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <div className="input-group input-group-sm">
                        <input type="text" className="form-control" placeholder="Слово или фраза"
                            value={wordForeign} onChange={handleChange("wordForeign")} />
                        <input type="text" className="form-control" placeholder="Перевод"
                            value={wordNative} onChange={handleChange("wordNative")} />
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="btn-group btn-group-sm" role="group">
                        <button type="submit" className="btn btn-primary">Сохранить</button>
                        <button type="button" className="btn btn-outline-primary"
                            onClick={handleCancel}>Отменить</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

WordPairEditing.propTypes = {
    wordForeign: PropTypes.string.isRequired,
    wordNative: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};

export default WordPairEditing;
